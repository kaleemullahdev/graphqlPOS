import bcrypt from "bcryptjs";
import { generateAccessToken, SALT_ROUNDS } from "../utils";
const {
  UserModel,
  CategoryModel,
  BrandModel,
  ProductModel,
} = require("../models");

export const mutation = {
  addProduct: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    try {
      const {
        name,
        description,
        categoryId,
        subCategory,
        mainImage,
        images,
        brandId,
      } = args;
      const product = await ProductModel.findOne({
        name,
        userId,
      });
      if (product) {
        return {
          code: 201,
          message: "Product Already Exists",
        };
      } else {
        const newProduct = new ProductModel({
          name,
          userId,
          description,
          categoryId,
          subCategory,
          mainImage,
          images,
          brandId,
        });
        await newProduct.save();
        return {
          code: 200,
          message: "Product Added Successfully",
        };
      }
    } catch (err) {
      return {
        code: 201,
        message: "Product Added Failed",
      };
    }
  },
  addBrand: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    try {
      const { name } = args;
      const brand = await BrandModel.findOne({ name, userId });
      if (brand) {
        return {
          code: 201,
          message: "Brand Already Exists",
        };
      } else {
        const newBrand = new BrandModel({
          name,
          userId,
        });
        await newBrand.save();
        return {
          code: 200,
          message: "Brand Added Successfully",
        };
      }
    } catch (err) {
      return {
        code: 201,
        message: "Brand Added Failed",
      };
    }
  },
  addCategory: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    try {
      const { name } = args;
      const category = await CategoryModel.findOne({ name });
      if (category) {
        return {
          code: 201,
          message: "Category Already Exists",
        };
      } else {
        const newCategory = new CategoryModel({
          name,
          userId,
        });
        await newCategory.save();
        return {
          code: 200,
          message: "Category Added Successfully",
        };
      }
    } catch (err) {
      return {
        code: 201,
        message: "Category Added Failed",
      };
    }
  },
  addSubCategory: async (_, args, context) => {
    const { userId } = context;
    if (!userId) {
      throw new Error("User not logged in");
    }
    try {
      const { name, categoryId } = args;
      const category = await CategoryModel.findById(categoryId);
      if (category && category.subCategories.includes(name)) {
        return {
          code: 201,
          message: "Category Already Exists",
        };
      } else {
        await CategoryModel.findByIdAndUpdate(categoryId, {
          subCategories: [...category.subCategories, name],
        });
        return {
          code: 200,
          message: "Category Added Successfully",
        };
      }
    } catch (err) {
      return {
        code: 201,
        message: "Category Added Failed",
      };
    }
  },
  login: async (_, args) => {
    const { email, password } = args;
    const user = await UserModel.findOne({ email });
    try {
      if (!user) {
        return {
          code: 404,
          message: "User not found",
        };
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = generateAccessToken(user._id);
          return {
            code: 200,
            message: "User Found",
            token,
          };
        }
        return {
          code: 201,
          message: "Password not match",
          token: "",
        };
      }
    } catch (err) {
      if (!!err) {
        return {
          code: 201,
          message: "Error occured",
          token: "",
        };
      }
    }
  },
  signUp: async (_, args) => {
    const { email, password, fullname } = args;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return {
          code: 201,
          message: "User email exists",
        };
      } else {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
          email,
          fullname,
          password: hashedPassword,
        });
        await newUser.save();
        return {
          code: 200,
          message: "User Found",
        };
      }
    } catch (err) {
      return {
        code: 201,
        message: err,
      };
    }
  },
};
