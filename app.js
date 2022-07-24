import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
import 'dotenv/config'

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/user", router);
app.use("/api/blog", blogrouter);



mongoose
    .connect(
    process.env.URL
    )
    .then(()=>app.listen(5000))
    .then(()=>
        console.log("Connected Successfully to Database !")
    )
    .catch((err)=>console.log(err));

app.use("/", (req,res,next)=>{
    res.send("Helli");
})

//kiJBWHz4c4hpsyci