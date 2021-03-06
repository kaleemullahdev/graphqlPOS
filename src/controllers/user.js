const express = require("express");
const router = express.Router();
let users = [];
router.get("/", function (req, res) {
  console.log("get request");
  res.send(users);
});
router.post("/", function (req, res) {
  console.log(req.body);
  res.send("POST route on things.");
});
export const UserController = router;
