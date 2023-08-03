const connection = require("../../../connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = "FEEDBACKAPI";

const signIn = (req, res) => {
  const { email, password } = req.body;
  try {
    connection.query(
      `select * from business_table where Email="${email}" limit 1`,
      async (err, rows) => {
        if (err) {
          console.log(err);
          res.send({ message: "Business not found", error: err });
        } else {
          const matchpassword = await bcrypt.compare(
            password,
            rows[0]?.Password
          );
          delete rows[0].Password;
          if (!matchpassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
          }
          const token = jwt.sign(
            { Email: rows[0].Email, B_id: rows[0].Business_id },
            SECRET_KEY
          );
          connection.query(
            "SELECT * FROM feedback WHERE B_id =" + rows[0].Business_id,
            (err, feed) => {
              if (err) {
                console.log(err);
                res.send({ message: "Business not found", error: err });
              } else {
                let feedbacknum = Object.keys(feed).length;
                let ticketsnum = 1;
                res.status(200).json({
                  business_details: rows[0],
                  feedback_datails: feed,
                  numberOfFeedbacks: feedbacknum,
                  numberOfTickets: ticketsnum,
                  customerSatisfaction: (ticketsnum / feedbacknum) * 100 + "%",
                  token: token,
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = { signIn };
