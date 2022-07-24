import express from "express";
import {getusers, login, signup}   from "../controllers/user-contoller";

const router = express.Router();

router.get("/", getusers)
router.post("/signup", signup);
router.post("/login", login);

export default router;