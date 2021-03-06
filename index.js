const express = require("express");
const dotenv = require("dotenv");
const { resolvers, typeDefs, context } = require("./src/graphql");
const bodyParser = require("body-parser");
let mongoose = require("mongoose");
const chalk = require("chalk");
const { ApolloServer } = require("apollo-server-express");
dotenv.config();
//constant
const mongodbUrl = `mongodb://${process.env.MONGODBURL}`;

let app = express();

//server configs

//mongo connection
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let db = mongoose.connection;
db.on("error", () => {
  console.error(chalk.red.bold.underline("mongodb error"));
});
db.once("open", function () {
  console.info(chalk.blueBright.bold.underline("mongodb connected"));
});
//middlewares

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

//routes
const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });

app.listen(process.env.PORT || 5000, () => {
  console.info(chalk.hex("#ffffff").bold.underline("server running: 5000"));
});

app.get("*", function (req, res) {
  return res.status(404).render("404");
});
