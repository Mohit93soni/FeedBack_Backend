const connection = require("../../../connection");

const getFeedbacks = (req, res) => {
  connection.query("SELECT * FROM feedback", (err, rows) => {
    if (err) {
      console.log(err);
      res.send({ message: "Business not found", error: err });
    } else {
      res.send(rows);
    }
  });
};

const createFeedback = (req, res) => {
  var data = req.body;
  var feedData = [
    data.Name,
    data.EmailId,
    data.Gender,
    data.Phone,
    data.Rating,
    data.Thoughts,
    data.Parameters,
    data.Location,
    data.Country,
    data.B_id,
  ];
  connection.query(
    "INSERT INTO feedback(Name,EmailId,Gender,Phone,Rating,Thoughts,Parameters,B_id) values(?)",
    [feedData],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
};

module.exports = { getFeedbacks, createFeedback };
