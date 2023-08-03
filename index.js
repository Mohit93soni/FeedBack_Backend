const connection = require("./connection");
const express = require("express");
const cors = require("cors");
const {
  getBusiness,
  getBusinessDetails,
  createBusiness,
  updateBusinessDetails,
  deleteBusiness,
} = require("./src/Controller/BusinessController");
const {
  getFeedbacks,
  createFeedback,
} = require("./src/Controller/FeedBackController");
const { signIn } = require("./src/Controller/BusinessUserController");

var app = express();
app.use(cors());

var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

//--Sign In
app.post("/signIn", urlencodedParser, (req, res) => signIn(req, res));

//--Feedback APIs
app.get("/getFeedback", urlencodedParser, (req, res) => getFeedbacks(req, res));
app.post("/createfeedback", urlencodedParser, (req, res) =>
  createFeedback(req, res)
);

//--Business APIs
app.get("/businesses", urlencodedParser, (req, res) => {
  getBusiness(req, res);
});
app.get("/businessDetails/:id", urlencodedParser, (req, res) => {
  getBusinessDetails(req, res);
});
app.post("/businessCreate", urlencodedParser, (req, res) =>
  createBusiness(req, res)
);
app.put("/updateBusinessDetails", urlencodedParser, (req, res) =>
  updateBusinessDetails(req, res)
);
app.delete("/deleteBusiness/:id", urlencodedParser, (req, res) =>
  deleteBusiness(req, res)
);

app.listen(3000, () => console.log("Express server running port 3000"));
