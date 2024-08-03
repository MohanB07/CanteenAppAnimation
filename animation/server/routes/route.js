const express = require("express");
const Router  = express.Router();

const { signin, signup } = require("../controllers/loginController");

Router.get("/signup", signup)
    .get("/signin", signin)
    
    

module.exports = Router;