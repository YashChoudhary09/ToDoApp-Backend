let express = require("express");
let router = express.Router();

let userController = require("../Controllers/userController");

router.get("/todo/allUsers",userController.getAllUsers);
router.post("/todo/signUp",userController.signUp);
router.post("/todo/login",userController.login);



module.exports=router;