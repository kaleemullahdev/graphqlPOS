import { verifyToken } from "../utils";
import { product, brand, category } from "../dataLoaders";

const dataLoader = { product, brand, category };

export const context = async ({ req }) => {
  if (req && req.headers && req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    const tokenRetrieved = authHeader && authHeader.split(" ")[1];
    if (tokenRetrieved == null) return { userId: null, dataLoader };
    const userId = verifyToken(tokenRetrieved);
    if (!userId) return { userId: null, dataLoader };
    return { userId, dataLoader };
  }
  return { userId: null, dataLoader };
};
