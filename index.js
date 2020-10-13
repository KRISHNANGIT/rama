const express = require("express");
const jwt = require("jsonwebtoken");
//node jwt//
const app = express();

app.get(`/api`,(req,res)=>{

    res.json({
        message:"Hi this is ram using first api service"
    });

});

app.post("/api/posts", verifyToken, (req, res) => {

    jwt.verify(req.token, "secretkey", (err, authData) => {
  
      if (err) {
  
        res.sendStatus(403);
  
      } else {
  
        res.json({
          message: "POST created...",
          authData
  
        });
      }
    });
  });
app.post(`/api/login`,(req,res)=> {
     const user = {
         id:2,
         name:"ram",
         email:"tram@gmail.com"
     }

     jwt.sign({user:user},`secretkey`,(err,token)=>{

        res.json({
            token,
        });
     });
});


function verifyToken(req, res, next) {

    const bearerHeader = req.headers["authorization"];
  
    if (typeof bearerHeader !== "undefined") {
  
      const bearerToken = bearerHeader.split(" ")[1];
  
      req.token = bearerToken;
  
      next();
  
    } else {
  
      res.sendStatus(403);
  
    }
  }

app.listen(3000,(req,res)=>{
   console.log("this server is running in 3000 port")
});