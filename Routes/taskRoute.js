let express = require("express");
let router = express.Router();
let taskController = require("../Controllers/taskController.js");


router.post("/todo/createTask",taskController.createTask);
router.get("/todo/getAllTasks/:userId",taskController.getAllTasks);
router.put("/todo/updateTask/:id",taskController.updateTask);
router.delete("/todo/deleteTask/:id",taskController.deleteTask);
router.put("/todo/isDoneTrueTask/:id",taskController.isDoneTrueTask);




module.exports= router;