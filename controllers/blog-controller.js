import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const getblogs = async (req, res, next) =>{
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return console.log(error);
    }
    if(!blogs){
        return res.status(404).json({ message : "No Blogs found !" });
    }
    return res.status(200).json({ blogs });
}

export const addblog = async (req, res, next) =>{

    
    const { title, description, image, user } = req.body;

     
    let existinguser;
    try {
        existinguser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existinguser){
        return res.status(400).json({ message : "User not found !" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    })
   

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existinguser.blogs.push(blog);
        await existinguser.save({ session });
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
        return res.status(500).json({ message : error });
    }

    return res.status(201).json({ blog });
}

export const updateblog = async (req, res, next) =>{
    const { title, description } = req.body;
    let blog;
    const blogId = req.params.id;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(404).json({ message : "Sorry Blog cannot be Updated !" });
    }
    return res.status(200).json({ blog });
}

export const getblogbyid = async (req, res, next) =>{
    const blogid = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogid);
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.json({ message : "Couldnt found blog by this id !" });
    }
    return res.json({ blog });
}

export const deleteblog = async (req, res, next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(400).json({ message: "Unable to delete the blog !" });
    }
    return res.status(201).json({ message: "Deleted Successfully "});
}

export const getbyuserid = async (req, res, next) =>{
    const userId = req.params.id;
    let usersblog;
    try {
        usersblog = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }
    if(!usersblog){
        return res.status(404).json({ message: "Unable to find the blog by users id !" });
    }
    return res.status(200).json({ user : usersblog });
}