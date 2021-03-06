import { ProductModel } from "../models";
const DataLoader = require("dataloader");

export const product = {
  findByCategory: new DataLoader(async (categoryIds) => {
    const products = await ProductModel.find({
      categoryId: { $in: categoryIds },
    });
    const data = categoryIds.map((id) =>
      products.filter(
        ({ categoryId }) => categoryId.toString() === id.toString()
      )
    );
    return data;
  }),
  findByBrand: new DataLoader(async (brandIds) => {
    const products = await ProductModel.find({
      brandId: { $in: brandIds },
    });
    const data = brandIds.map((id) =>
      products.filter(({ brandId }) => brandId.toString() === id.toString())
    );
    return data;
  }),
};
