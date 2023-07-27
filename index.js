const connection = require('./connection');
const express = require('express');
const nodemon = require('nodemon');
const cors = require('cors');

var bodyParser = require('body-parser');
var app = express();
app.use(cors())

var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(bodyParser.json());

app.get('/getFeedback',urlencodedParser,(req,res)=>{
    connection.query('SELECT * FROM feedback',(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
          res.send(rows);
        }
    })
})

// app.get('/getFeedback',urlencodedParser,(req,res)=>{
//     connection.query('SELECT * FROM feedback',(err,rows)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//           res.send(rows);
//         }
//     })
// })


app.post('/feedback',urlencodedParser,  (req, res)=> {
    var data = req.body;
    var feedData = [data.Name,data.EmailId,data.Gender,data.Phone,data.Rating,data.Thoughts,data.Parameters]
    connection.query('INSERT INTO feedback(Name,EmailId,Gender,Phone,Rating,Thoughts,Parameters) values(?)',[feedData],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
          res.send(rows);
        }
    })
   
 });

 app.get('/businessDetails',urlencodedParser,(req,res)=>{
    connection.query('SELECT * FROM business_table',(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
          res.send(rows);
        }
    })
})

 app.post('/businessCreate',urlencodedParser,  (req, res)=> {
    var data = req.body;
    var B_Data = [data.B_name,data.Address,data.Phone,data.Email,data.Personal_name,data.Remark,data.B_logo]
    connection.query('INSERT INTO business_table(B_name,Address,Phone,Email,Personal_name,Remark,B_logo) values(?)',[B_Data],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
          res.send(rows);
        }
    })
   
 });

 app.put('/updateBusinessDetails',urlencodedParser,  (req, res)=> {
    var data = req.body;
    var B_Data = [data.B_name,data.Address,data.Phone,data.Email,data.Personal_name,data.Remark,data.B_logo,data.Business_id]
    connection.query('UPDATE business_table SET B_name=?,Address=?,Phone=?,Email=?,Personal_name=?,Remark=?,B_logo=? where Business_id = ?',B_Data,(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
          res.send(rows);
        }
    })
   
 });

 app.delete('/deleteBusiness/:id',urlencodedParser,(req,res)=>{
    const id = req.params.id;
   console.log(id);
    connection.query("DELETE FROM business_table WHERE Business_id ="+id,(err,result)=>{
        if(err){
        console.log(err);
        res.send(err)
    }
    else{
      res.send(result);
    }
    });

 })
app.listen(3000,()=>console.log("Express server running port 3000"));