let Task = require("../Models/taskModel.js");

module.exports.createTask = async(req,res)=>{
    try{
         console.log(req.body);
         let{taskName,description,category,isDone,userId} = req.body;
        
         let createNewTask =  new Task({
            taskName:taskName,
            description:description,
            category:category,
            isDone:isDone,
            date:Date.now(),
            userId:userId
         })
         await createNewTask.save();
         console.log(createNewTask);

         res.status(200).json({
            success:true,
            message:"Task Created Successfully!",
            data:createNewTask
         })
    } catch(error){
          res.status(500).json({success:false,message:"Server error!",error:error.message});
    }
}


module.exports.getAllTasks = async(req,res)=>{
    try{
       let{userId} = req.params;
       console.log(userId);
       if(!userId){
        return res.status(400).json({success:false,message:"User not found!"});
       }
       let tasks = await Task.find({userId:userId.trim()});
       console.log(tasks);
       res.status(200).json({
        success:true,
        message:"All task found successfully!",
        data:tasks
       })

    } catch(error){
           res.status(500).json({success:false,message:"Server error!",error:error.message})
    }
}



module.exports.updateTask = async(req,res)=>{
    try{
        let{id} = req.params;
        let{taskName,description,category,isDone} = req.body;
        if(!id){
            return res.status(400).json({success:false,message:"No task found!"});
        }
      
         let updateTask =  await Task.findByIdAndUpdate(id,{
            taskName:taskName,
            description:description,
            category:category,
            isDone:isDone,
           
         },{new:true}
        )

         
         console.log(updateTask);

         res.status(200).json({
            success:true,
            message:"Task Updated Successfully!",
            data:updateTask
         })

    } catch(error){
        res.status(500).json({success:false,message:"Server error",error:error.message});
    }
}


module.exports.deleteTask = async(req,res)=>{
    try{
        let{id} = req.params;
         if(!id){
            return res.status(400).json({success:false,message:"No task found!"});
        }
        let deleteTask = await Task.findByIdAndDelete(id);
        console.log(`deleted task = ${deleteTask}`);
        res.status(200).json({success:true,message:"Task deleted successfully!"});

    } catch(error){
        res.status(500).json({success:false,message:"Server error!",error:error.message});

    }
}

module.exports.isDoneTrueTask = async(req,res)=>{
    try{
        let{id} = req.params;
         
        let updatedTask = await Task.findByIdAndUpdate(id,{isDone:true},{new:true});

        if(!updatedTask){
          return  res.status(400).json({success:false,message:"No any task found!"});

        }
       res.status(200).json({
        success:true,
        message:"Task successfully completed!",
        data:updatedTask
       })
    } catch(error){
        res.status(500).json({success:false,message:"Server error!",error:error.message});

    }
}


