import { Router } from "express";

import usersViewController from "../controllers/users/usersViewController.js";

const router = Router();

router.get("/",(req,res)=>{
    usersViewController.getAll(req,res);
});


export default router;