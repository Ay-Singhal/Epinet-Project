// import express from "express";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const UserModel = require("./models/UserSchema");



// mongoose.connect(MONGO_URI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });()=>{
//     console.log("connected to DB")
// }

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json("server running");
});

// ------------ register user -----------
app.post("/api/create", (req, res) => {
  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return (
        // res.status(400).json({ email: "Email already exists.." }),
        res.send({ message: "Email Already Exists.." }),
        console.log("email---", req.body.email)
      );
    } else {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        hasSiteApproved: req.body.hasSiteApproved,
        hasRegionalApproved: req.body.hasRegionalApproved,
        hasHeadApproved: req.body.hasHeadApproved,
        designation:req.body.designation,
        mobile:req.body.mobile,
        cpf:req.body.cpf,
        department:req.body.department,
        location:req.body.location,
        options:req.body.options,
      });

      newUser
        .save()
        .then(() => res.send({ message: "Registered Successfully..", success:true }))
        .catch((err) => console.log(err));
    }
  });
});

// ------------ Login user ------------
app.post("/api/login", (req, res) => {
  const { email, password, type } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (type === user.type) {
          if ( (type==='site'|| type==='regional'|| type==='head')||
            (user.hasSiteApproved &&
            user.hasRegionalApproved &&
            user.hasHeadApproved)
          ) {
            if (password === user.password) {
              res.send({ message: user.type, id:user._id });
            } else {
              res.send({ message: "Wrong credentials" });
            }
          } else {
            res.send({ message: "Account is Not yet Approved!" });
          }
        } else {
          res.send({ message: "Select the correct type" });
        }
      } else {
        res.send({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      // res.send(err)
    });
});

// ------- Retrieve all users ---------------
app.get("/api/users", (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// ------- Retrieve a user ---------------
app.get("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  UserModel.findById(userId)
    .then((user) => {
      if(!user){
        res.status(404).json({error:"User not found"})
      }

      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//Update hasSiteApproved
app.put("/api/users/:id/approve-site", (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndUpdate(id, { hasSiteApproved: true })
    .then(() => {
      res.json({ message: "User Approved" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server error" });
    });
});


//Update hasRegionalApproved
app.put("/api/users/:id/approve-regional", (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndUpdate(id, { hasRegionalApproved: true })
    .then(() => {
      res.json({ message: "User Approved" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server error" });
    });
});


//Update hasHeadApproved
app.put("/api/users/:id/approve-head", (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndUpdate(id, { hasHeadApproved: true })
    .then(() => {
      res.json({ message: "User Approved" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server error" });
    });
});

app.listen(3001, () => {
  console.log("server started in port 3001");
});
