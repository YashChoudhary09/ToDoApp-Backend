let mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    category:{
        type:String,
        default:"task"
    },
    isDone:{
        type:Boolean,
        default:false
    },
   date:{
    type:Date,
    default:Date.now,
   },
   userId:{
    type:String,
    required:true
   }
})

let Task = mongoose.model("Task",taskSchema);


module.exports=Task;