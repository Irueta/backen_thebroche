import { Router } from "express";
import usersController from "../controllers/users/usersController.js";
import eventosController from "../controllers/eventos/eventosController.js";
import gruposController from "../controllers/grupos/gruposController.js";
import authController  from "../controllers/auth/authController.js";

const router = Router();

router.get("/",authController.isAdmin,async (req,res)=>{
    const errorMessage = req.query.error
    res.render("admin",{error:errorMessage});
});


router.get("/users",authController.isAdmin,async (req,res)=>{
    const users = await usersController.getAll(req,res);
    res.render("users/list", {users})
   /* res.json(users) */
});

router.get("/events",authController.isAdmin,async (req,res)=>{
    const eventos = await eventosController.getAll(req,res);
    res.render("eventos/list", {eventos})
   /* res.json(eventos) */
});

router.get("/groups",authController.isAdmin,async (req,res)=>{
    const grupos = await gruposController.getAll(req,res);
    res.render("grupos/list", {grupos})
   /* res.json(grupos) */
});

export default router;