import { query } from "./query";
import { mutation } from "./mutation";

export const resolvers = {
  Query: query,
  Mutation: mutation,
  User: {
    async brand(parent, _, { dataLoader: { brand } }) {
      const data = await brand.findByUserId.load(parent._id);
      return data;
    },
    async categories(parent, _, { dataLoader: { category } }) {
      const data = await category.findByUserId.load(parent._id);
      return data;
    },
  },

  Category: {
    async product(parent, _, { dataLoader: { product } }) {
      const data = await product.findByCategory.load(parent._id);
      return data;
    },
  },
  Brand: {
    async product(parent, _, { dataLoader: { product } }) {
      const data = await product.findByBrand.load(parent._id);
      return data;
    },
  },
};
