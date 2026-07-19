import express from "express";
import { register,login } from "../controllers/authControllers.js";

const router=express.Router();

//register api
router.post("/register", register);


//login api
router.post("/login",login);

export default router;