import { NextFunction, Request, Response } from "express";
import { myCache } from "../app.js";
import { Product } from "../modles/productModel.js";
import { User } from "../modles/userModel.js";
import { Order } from "../modles/OrderModel.js";
// import { Promise } from "mongoose";
import { calculatePercentage } from "../utils/features.js";

export const getDashBoardStats = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    let stats = {};

    if (myCache.has("admin-stats")) {
      stats = JSON.parse(myCache.get("admin-stats") as string);
    } else {
      const today = new Date();
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

      const thisMonth = {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: today,
      };
      const lastMonth = {
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0),
      };

      const thisMonthProductPromise = Product.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });
      const lastMonthProductPromise = Product.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const thisMonthUsersPromise = User.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });
      const lastMonthUsersPromise = User.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });
      const thisMonthOrdersPromise = Order.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });
      const lastMonthOrdersPromise = Order.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const lastSixMonthOrdersPromise = Order.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      });

      const latestTransactionsPromise = Order.find({})
        .select(["orderItems", "discount", "total", "status"])
        .limit(4);

      const [
        thisMonthUsers,
        thisMonthProduct,
        thisMonthOrders,
        lastMonthUsers,
        lastMonthProduct,
        lastMonthOrders,
        productCount,
        userCount,
        allOrders,
        lastSixMonthOrders,
        categories,
        femaleCount,
        latestTransactions,
      ] = await Promise.all([
        thisMonthUsersPromise,
        thisMonthProductPromise,
        thisMonthOrdersPromise,
        lastMonthUsersPromise,
        lastMonthProductPromise,
        lastMonthOrdersPromise,
        Product.countDocuments(),
        User.countDocuments(),
        Order.find({}).select("total"),
        lastSixMonthOrdersPromise,
        Product.distinct("category"),
        User.countDocuments({ gender: "female" }),
        latestTransactionsPromise,
      ]);

      const thisMonthRevenue = thisMonthOrders.reduce(
        (total, order) => total + (order.total || 0),
        0
      );
      const lastMonthRevenue = lastMonthOrders.reduce(
        (total, order) => total + (order.total || 0),
        0
      );

      const changePercent = {
        revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
        user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
        product: calculatePercentage(
          thisMonthProduct.length,
          lastMonthProduct.length
        ),
        order: calculatePercentage(
          thisMonthOrders.length,
          lastMonthOrders.length
        ),
      };

      const revenue = allOrders.reduce(
        (total, order) => total + (order.total || 0),
        0
      );

      const count = {
        revenue,
        user: userCount,
        product: productCount,
        order: allOrders.length,
      };
      const orderMonthlyCounts = new Array(6).fill(0);
      const orderMonthlyRevenue = new Array(6).fill(0);

      lastSixMonthOrders.forEach((order) => {
        const creationDate = order.createdAt;
        const monthDiff =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < 6) {
          orderMonthlyCounts[5 - monthDiff] += 1;
          orderMonthlyRevenue[5 - monthDiff] += order.total;
        }
      });

      const categoriesCountPromise = categories.map((category) =>
        Product.countDocuments({ category })
      );

      const categoriesCount = await Promise.all(categoriesCountPromise);

      const categoryCount: Record<string, number>[] = [];

      categories.forEach((category, i) => {
        categoryCount.push({
          [category]: Math.round((categoriesCount[i] / productCount) * 100),
        });
      });
      const maleCount = userCount - femaleCount;

      const malePercent = Math.round((maleCount / userCount) * 100);
      const femalePercent = Math.round(100 - malePercent);
      const userRatio = {
        male: malePercent,
        female: femalePercent,
      };

      const modifiedLatestTransactions = latestTransactions.map((tran) => ({
        _id: tran._id,
        discount: tran.discount,
        amount: tran.total,
        quantity: tran.orderItems.length,
        status: tran.status,
      }));
      stats = {
        modifiedLatestTransactions,
        userRatio,
        categories,
        categoriesCount,
        categoryCount,
        changePercent,
        count,
        chart: {
          order: orderMonthlyCounts,
          revenue: orderMonthlyRevenue,
        },
      };

      myCache.set("admin-stats", JSON.stringify(stats));
    } //posjdiojjjjjjjjjjjjjjjjjjfpwejfpwoefj
    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    return next(new Error(""));
  }
};

export const getPieCharts = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    let charts;
    if (myCache.has("admin-pie-charts")) {
      charts = JSON.parse(myCache.get("admin-pie-charts") as string);
    } else {
      const allOrderPromise = Order.find({}).select([
        "total",
        "tax",
        "discount",
        "shippingCharges",
        "subtotal",
      ]);
      const [
        orderDeliveredCoount,
        orderProcessingCount,
        OrderShippedCount,
        categories,
        productCount,
        productOutOfStock,
        allOrders,
        allUser,
      ] = await Promise.all([
        Order.countDocuments({ status: "Delivered" }),
        Order.countDocuments({ status: "Processing" }),
        Order.countDocuments({ status: "Shipped" }),
        Product.distinct("category"),
        Product.countDocuments(),
        Product.countDocuments({ stock: 0 }),
        allOrderPromise,
        User.find({}).select("dob"),
      ]);
      //category------------------------------------------------------------------------------------------------------
      const categoriesCountPromise = categories.map((category) =>
        Product.countDocuments({ category })
      );

      const categoriesCount = await Promise.all(categoriesCountPromise);

      const categoryCount: Record<string, number>[] = [];

      categories.forEach((category, i) => {
        categoryCount.push({
          [category]: Math.round((categoriesCount[i] / productCount) * 100),
        });
      });
      //OrderStatus----------------------------------------------------------------------------------------------------

      const orderFullFillment = {
        Delivered: orderDeliveredCoount,
        Processing: orderProcessingCount,
        Shipped: OrderShippedCount,
      };

      //STOCK AVAILBILITY-----------------------------------------------------------------------------------------------
      const stockAvailability = {
        inStock: productCount - productOutOfStock,
        outOfStock: productOutOfStock,
      };

      //REVENUE DISTRIBUTATION------------------------------------------------------------------------------------------

      const grossIncome = allOrders.reduce(
        (prev, order) => prev + (order.total || 0),
        0
      );

      const discount = allOrders.reduce(
        (prev, order) => prev + (order.discount || 0),
        0
      );

      const productionCost = allOrders.reduce(
        (prev, order) => prev + (order.shippingCharges || 0),
        0
      );

      const burnt = allOrders.reduce(
        (prev, order) => prev + (order.tax || 0),
        0
      );
      const marketingCost = Math.round(grossIncome * (30 / 100));

      const netMargin =
        grossIncome - discount - productionCost - burnt - marketingCost;

      const revenueDistributation = {
        netMargin,
        discount,
        productionCost,
        burnt,
        marketingCost,
      };
      //USER AGE GROUP---------------------------------------------------------------------------------------------------
      const usersAge = {
        teen: allUser.filter((i) => i.age < 20).length,
        adult: allUser.filter((i) => i.age < 40 && i.age >= 20).length,
        old: allUser.filter((i) => i.age >= 40).length,
      };

      charts = {
        orderFullFillment,
        categoryCount,
        stockAvailability,
        revenueDistributation,
        usersAge,
      };
      myCache.set("admin-pie-charts", JSON.stringify(charts));
    }

    return res.status(200).json({
      success: true,
      charts,
    });
  } catch (error) {
    return next(new Error(""));
  }
};

export const getBarCharts = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    let charts;
    const key = "admin-bar-charts";

    if (myCache.has(key)) {
      charts = JSON.parse(myCache.get(key) as string);
    } else {
      const today = new Date();
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

      const twelveMonthAgo = new Date();
      twelveMonthAgo.setMonth(twelveMonthAgo.getMonth() - 12);

      const lastSixMonthProductPromise = Product.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      }).select("createdAt");
      const lastSixMonthUserPromise = User.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      }).select("createdAt");
      const twelveMonthOrdersPromise = Order.find({
        createdAt: {
          $gte: twelveMonthAgo,
          $lte: today,
        },
      }).select("createdAt");

      const [sixMonthProduct, sixMonthUser, twelveMonthOrders] =
        await Promise.all([
          lastSixMonthProductPromise,
          lastSixMonthUserPromise,
          twelveMonthOrdersPromise,
        ]);

      const monthlyProduct = new Array(6).fill(0);

      sixMonthProduct.forEach((product) => {
        const creationDate = product.createdAt;
        const monthDiff =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < 6) {
          monthlyProduct[5 - monthDiff] += 1;
        }
      });

      const monthlyUser = new Array(6).fill(0);

      sixMonthUser.forEach((user) => {
        const creationDate = user.createdAt;
        const monthDiff =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < 6) {
          monthlyUser[5 - monthDiff] += 1;
        }
      });

      const monthlyOrders = new Array(12).fill(0);

      twelveMonthOrders.forEach((order) => {
        const creationDate = order.createdAt;
        const monthDiff =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < 12) {
          monthlyOrders[11 - monthDiff] += 1;
        }
      });

      charts = {
        product: monthlyProduct,
        users: monthlyUser,
        orders: monthlyOrders,
      };

      myCache.set(key, JSON.stringify(charts));
    } //ELSE BLOCK ENDS HERE

    return res.status(200).json({
      success: true,
      charts,
    });
  } catch (error) {
    return next(new Error(""));
  }
};

export const getLineCharts = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    let charts;
    const key = "admin-bar-line";

    if (myCache.has(key)) {
      charts = JSON.parse(myCache.get(key) as string);
    } else {
      const today = new Date();

      const twelveMonthAgo = new Date();
      twelveMonthAgo.setMonth(twelveMonthAgo.getMonth() - 12);

      const baseQuery = {
        createdAt: {
          $gte: twelveMonthAgo,
          $lte: today,
        },
      };

      const [twelveMonthUser, twelveMonthOrders] = await Promise.all([
        User.find(baseQuery).select("createdAt"),
        Order.find(baseQuery).select(["createdAt", "total"]),
      ]);

      const monthlyUser = new Array(12).fill(0);
      console.log(twelveMonthUser);

      twelveMonthUser.forEach((user) => {
        const creationDate = user.createdAt;
        const monthDiff =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < 12) {
          monthlyUser[11 - monthDiff] += 1;
        }
      });

      const monthlyOrders = new Array(12).fill(0);
      console.log(twelveMonthOrders);
      twelveMonthOrders.forEach((order) => {
        const creationDate = order.createdAt;
        const monthDiff =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < 12) {
          monthlyOrders[11 - monthDiff] += order.total;
        }
      });

      charts = {
        users: monthlyUser,
        revenue: monthlyOrders,
      };

      // myCache.set(key, JSON.stringify(charts));
    } //ELSE BLOCK ENDS HERE

    return res.status(200).json({
      success: true,
      charts,
    });
  } catch (error) {
    return next(new Error(""));
  }
};
