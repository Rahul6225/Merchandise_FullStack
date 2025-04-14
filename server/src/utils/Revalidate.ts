import { myCache } from "../app.js";
import { invalidateCacheType } from "../types/types.js";

export const invalidateCache =async ({
  product,
  admin,
  order,
}: invalidateCacheType) => {
    if(product){
        const productKeys: string[] = [
          "latest-product",
          "categories",
          "all-products",
        ];

        myCache.del(productKeys);
    }

    if(admin){
      myCache.del([
        "admin-stats",
        "admin-pie-charts",
        "admin-bar-charts",
        "admin-bar-line",
      ]);

    }
    if(order){
        myCache.del("all-orders");
    }
};
