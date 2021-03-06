import { CategoryModel } from "../models";
const DataLoader = require("dataloader");

export const category = {
  findByUserId: new DataLoader(async (userIds) => {
    const categories = await CategoryModel.find({
      userId: { $in: userIds },
    });
    const data = userIds.map((id) =>
      categories.filter(({ userId }) => userId.toString() === id.toString())
    );
    return data;
  }),
};
