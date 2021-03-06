const {
  UserModel,
  CategoryModel,
  BrandModel,
  ProductModel,
} = require("../models");

export const query = {
  getAllProducts: async (_, __, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await ProductModel.find({ userId });
    return data;
  },
  getProduct: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await ProductModel.find({ _id: args.productId, userId });
    return data && data.length ? data[0] : null;
  },
  getBrand: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await BrandModel.find({ name: args.name, userId });
    return data && data.length ? data[0] : null;
  },
  getAllBrands: async (_, __, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await BrandModel.find({ userId });
    return data;
  },
  getCategory: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await CategoryModel.find({ name: args.name, userId });
    return data && data.length ? data[0] : null;
  },
  getAllCategories: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await CategoryModel.find({ userId });
    return data;
  },
  allUsersInfo: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await UserModel.find();
    return data;
  },
  getUser: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    const data = await UserModel.find({ _id: userId });
    return data[0];
  },
};
