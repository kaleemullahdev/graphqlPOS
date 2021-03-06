import { BrandModel } from "../models";
const DataLoader = require("dataloader");

export const brand = {
  findByUserId: new DataLoader(async (userIds) => {
    const brands = await BrandModel.find({
      userId: { $in: userIds },
    });
    const data = userIds.forEach((id) =>
      brands.filter(({ userId }) => userId.toString() === id.toString())
    );
    return data;
  }),
};
