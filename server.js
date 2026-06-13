require("dotenv").config();

let express = require("express");
let connectDB = require("./Config/db");


let app = express();
// 🚀 यह रही वो जादुई लाइन! इसे राउटर से पहले लिखना ज़रूरी है
app.use(express.json());

connectDB();



// १. अपने बनाए हुए राउटर को बुलाओ
let userRoutes = require("./Routes/userRoute.js");
let taskRoutes = require("./Routes/taskRoute.js");
// २. एक्सप्रेस ऐप से कहो कि इस रास्ते का इस्तेमाल करे
let cors = require("cors");
app.use(cors());
app.use("/",userRoutes);
app.use("/",taskRoutes);

let port = process.env.PORT||8080;
app.listen(port,()=>{
    console.log(`App is listening to port ${port}`);
})

