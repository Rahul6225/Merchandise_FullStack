import { NextFunction, Request, Response } from "express";
import {
  BaseQuery,
  NewProduct,
  Params,
  SearchReqQuery,
} from "../types/types.js";
import { Product } from "../modles/productModel.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/Revalidate.js";

export const newProduct = async (
  req: Request<{}, {}, NewProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, category, stock } = req.body;

    const photo = req.file;
    if (!photo) {
      return next(new Error("Upload a Photo"));
    }
    if (!name || !price || !category || !stock) {
      rm(photo.path, () => {
        console.log("photo deleted");
      });
      return next(new Error("All Fields not filled"));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    await invalidateCache({product:true,admin:true})

    return res.status(201).json({
      success: true,
      message: "Product Created",
    });
  } catch (error) {
    // console.log(error);
    return next(new Error("newProduct"));
  }
};


//But we have to revalidate this whenever Product is updated ,created,deleted or order
export const GetLatestProduct = async (
  req: Request<{}, {}, NewProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    let product;

    if (myCache.has("latest-product")) {
      product = JSON.parse(myCache.get("latest-product") as string);
    } else {
      product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
      myCache.set("latest-product", JSON.stringify(product));
    }

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Error in GetLatestProduct"));
  }
};


//But we have to revalidate this whenever Product is updated ,created,deleted or order
export const getAllCategories = async (
  req: Request<{}, {}, NewProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    let categories;
    if (myCache.has("categories")){
      categories=JSON.parse(myCache.get("categories") as string);
    }

    else{
      categories = await Product.distinct("category");
      myCache.set("categories",JSON.stringify(categories));

    }
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Error in getAllCategories"));
  }
};


//But we have to revalidate this whenever Product is updated ,created,deleted or order
export const getAdminProducts = async (
  req: Request<{}, {}, NewProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    let product;

    if(myCache.has("all-products")){
      product = JSON.parse(myCache.get("all-products") as string);
    }
    else{
    product = await Product.find({});

    myCache.set("all-products",JSON.stringify(product));

    }
    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Error in getAdminProducts"));
  }
};

export const getSingleProduct = async (
  req: Request<Params, {}, NewProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new Error("No Product Found"));
    }
    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Error in getSingleProduct"));
  }
};

export const updateProduct = async (
  req: Request<Params, {}, NewProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const { name, price, category, stock } = req.body;

    const photo = req.file;
    const product = await Product.findById(id);
    if (!product) {
      return next(new Error("No Product Found"));
    }
    console.log(photo);
    console.log(name);

    console.log(price);

    console.log(stock);

    if (photo) {
      rm(product.photo, () => {
        console.log("photo deleted");
      });

      product.photo = photo.path;
    }
    if (price) {
      product.price = price;
    }
    if (category) {
      product.category = category;
    }
    if (stock) {
      product.stock = stock;
    }
    if (name) {
      product.name = name;
    }
    await product.save();
    await invalidateCache({ product: true ,admin:true});

    return res.status(201).json({
      success: true,
      message: "Product Updated",
      product,
    });
  } catch (error) {
    // console.log(error);
    return next(new Error("UpdateProduct"));
  }
};

export const deleteProduct = async (
  req: Request<Params, {}, NewProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    if (!product) {
      return next(new Error("No Product Found"));
    }
    rm(product.photo, () => {
      console.log("photo deleted");
    });
    await product.deleteOne();
    await invalidateCache({ product: true,admin:true });

    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    // console.log(error);
    return next(new Error("DeletedProduct"));
  }
};

export const getAllProducts = async (
  req: Request<{}, {}, {}, SearchReqQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      baseQuery.category = category;
    }
    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }

    const products = await Product.find(baseQuery)
      .limit(limit)
      .skip(skip)
      .sort(sort && { price: sort === "asc" ? 1 : -1 });

    const totalPage = Math.ceil(products.length / limit);
    
    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    return next(new Error("Error in getAllProducts"));
  }
};
