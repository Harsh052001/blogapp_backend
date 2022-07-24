import express from "express";
import { getblogs, addblog, updateblog, getblogbyid, deleteblog, getbyuserid }  from "../controllers/blog-controller";

const blogrouter = express.Router();

blogrouter.get("/", getblogs);
blogrouter.post("/add", addblog);
blogrouter.put("/update/:id", updateblog);
blogrouter.get("/:id", getblogbyid);
blogrouter.delete("/:id", deleteblog);
blogrouter.get("/user/:id", getbyuserid);

export default blogrouter;