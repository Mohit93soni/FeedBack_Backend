const connection = require("../../../connection");
const bcrypt = require("bcrypt");

const getBusiness = (req, res) => {
  connection.query("SELECT * FROM business_table", (err, rows) => {
    if (err) {
      console.log(err);
      res.send({ message: "Business not found", error: err });
    } else {
      delete rows[0].Password;
      res.send(rows);
    }
  });
};

const getBusinessDetails = (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT * FROM business_table  WHERE Business_id =" + id,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send({ message: "Business not found", error: err });
      } else {
        delete rows[0].Password;
        res.send(rows);
      }
    }
  );
};

const createBusiness = async (req, res) => {
  var data = req.body;
  const hashedPassword = await bcrypt.hash(data.Password, 10);
  var B_Data = [
    data.B_name,
    data.Address,
    data.Phone,
    data.Email,
    data.Personal_name,
    data.Remark,
    data.B_logo,
    hashedPassword,
  ];
  connection.query(
    "INSERT INTO business_table(B_name,Address,Phone,Email,Personal_name,Remark,B_logo,Password) values(?)",
    [B_Data],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
};

const updateBusinessDetails = (req, res) => {
  var data = req.body;
  var B_Data = [
    data.B_name,
    data.Address,
    data.Phone,
    data.Email,
    data.Personal_name,
    data.Remark,
    data.B_logo,
    data.Business_id,
  ];
  connection.query(
    "UPDATE business_table SET B_name=?,Address=?,Phone=?,Email=?,Personal_name=?,Remark=?,B_logo=? where Business_id = ?",
    B_Data,
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
};

const deleteBusiness = (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM business_table WHERE Business_id =" + id,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

module.exports = {
  getBusiness,
  getBusinessDetails,
  createBusiness,
  updateBusinessDetails,
  deleteBusiness,
};
