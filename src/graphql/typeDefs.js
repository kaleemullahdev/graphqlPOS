const { gql } = require("apollo-server-express");
export const typeDefs = gql`
  type Query {
    allUsersInfo: [User]
    getAllCategories: [Category]
    getCategory(name: String!): Category
    getBrand(name: String!): Brand
    getAllBrands: [Brand]
    getAllProducts: [Product]
    getProduct(productId: ID!): Product
    getUser(id: String!): User
  }
  type Mutation {
    signUp(email: String!, password: String!, fullname: String!): ResponseType
    login(email: String!, password: String!): LoginType
    addBrand(name: String!): ResponseType
    addCategory(name: String!): ResponseType
    addSubCategory(name: String!, categoryId: ID!): ResponseType
    addProduct(
      name: String!
      description: String!
      categoryId: String!
      subCategory: String!
      images: [String!]
      mainImage: String!
      brandId: String!
    ): ResponseType
  }
  type Product {
    id: ID!
    name: String!
    description: String!
    categoryId: String
    subCategory: String
    images: [String]
    mainImage: String!
    brandId: String
  }
  type Category {
    id: ID!
    name: String!
    subCategories: [String]
    product: [Product]
  }
  type Brand {
    id: ID!
    name: String!
    product: [Product]
  }
  type User {
    id: String
    email: String
    fullname: String
    type: String
    brand: [Brand]
    categories: [Category]
  }
  type LoginType {
    message: String
    token: String
    code: Int
  }
  type ResponseType {
    message: String
    code: Int
  }
`;
