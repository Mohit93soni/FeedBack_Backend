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

app.listen(3000,()=>console.log("Express server running port 3000"));