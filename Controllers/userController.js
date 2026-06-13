
let User = require("../Models/userModel");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

module.exports.signUp = async(req,res)=>{
    try{
        console.log(req.body);
        let{name,emailId,password} = req.body;
          if(!name || !emailId || !password){
            return res.status(400).json({message:"Name ,Email and Password are required!"});
        }

        let existingUser = await User.findOne({emailId:emailId});
        if(existingUser){
            return  res.status(400).json({
            success:false,
            message:"Already registered ! Please Login",
          
         })
        }

         let hashPassword =  await bcrypt.hash(password,10);
         
        
         let newUser = new User({
                name:name,
                emailId:emailId,
                password:hashPassword,
            });
      
            await newUser.save();
            newUser.password=undefined;

            let jwtToken =  jwt.sign(
            {userId:newUser._id},
            process.env.JWT_SECRET || "YASH_SECRET_KEY_2002",
            {expiresIn:"1d"}
         )

            res.status(200).json({
                success:true,
                message:"You are saved successfully!",
                data:newUser,
                token:jwtToken,
                
            })


     

    } catch(error){
            res.status(500).json({success:false,message:error.message});
    }
}

module.exports.login = async(req,res)=>{
    try{
        console.log(req.body);
        let{emailId,password} = req.body;
          if( !emailId || !password){
            return res.status(400).json({message:"Email and Password are required!"});
        }

        let user = await User.findOne({emailId:emailId});
        if(!user){
            return  res.status(400).json({
            success:false,
            message:"Invalid EmailId or Password!",
         })
        }

         let isMatch =  await bcrypt.compare(password,user.password);
         if(!isMatch){
            return  res.status(400).json({
            success:false,
            message:"Invalid EmailId or Password!",
         })
        }
          let jwtToken = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
          )
             user.password=undefined;
            res.status(200).json({
                success:true,
                message:"You are saved successfully!",
                token:jwtToken,
                data:user
            })
     

    } catch(error){
            res.status(500).json({success:false,message:error.message});
    }
}

module.exports.getAllUsers = async(req,res)=>{
    try{
        let allUsers = await User.find();
        if(allUsers.length === 0){
           return res.status(400).json({success:false,message:"No any user found!"});

        } 
        res.status(200).json({success:true,data:allUsers});
       
    } catch(error){
          res.status(500).json({message:"Server Error",error:error.message});
    }
}
