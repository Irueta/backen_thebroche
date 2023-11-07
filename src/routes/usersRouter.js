import { Router } from "express";
import usersController from "../controllers/users/usersController.js";
import authController from "../controllers/auth/authController.js"
const router = Router();


router.get("/",authController.isAdmin,async (req,res)=>{
    const users = await usersController.getAll(req,res);
    res.render("users/list", {users})
   /* res.json(users) */
});

router.get("/new",(req,res)=>{
    res.send("estas en creacion de un usuario");
});

router.get("/:id",async (req,res)=>{
    const id= req.params.id
    const user= await usersController.getById(id);
    /* res.json(user) */
    res.render("users/show", {user})
});


router.get("/:id/edit",(req,res)=>{
    res.render("users/edit")
});


router.get("/:id/delete",(req,res)=>{
    res.send("estas en eliminacion de un usuario");
});

export default router;