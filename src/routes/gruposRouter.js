import { Router } from "express";
import gruposController from "../controllers/grupos/gruposController.js";
import usersController from "../controllers/users/usersController.js";
import eventosController from "../controllers/eventos/eventosController.js";
const router = Router();


router.get("/",async (req,res)=>{
    const grupos = await gruposController.getAll(req,res);
    res.render("grupos/list", {grupos})
   /* res.json(grupos) */
});

router.get("/myGroups",async (req,res)=>{
    const grupos = await gruposController.getByUser(req,res);
    /* res.render("grupos/list", {grupos}) */
        res.json(grupos)
});

router.get("/new",(req,res)=>{
    res.send("estas en creacion de un usuario");
});

router.get("/:id",async (req,res)=>{
    const id= req.params.id
    const grupo= await gruposController.getById(id);
    const eventos=await eventosController.getByIdGrupo(id);
    const usuarios=await usersController.getByIdGrupo(id);
    console.log(eventos,usuarios);
    res.json({grupo,eventos,usuarios})
    /* res.render("grupos/show", {grupo,eventos}) */
});


router.get("/:id/edit",(req,res)=>{
    res.send("estas en actualizacion de un usuario");
});


router.get("/:id/delete",(req,res)=>{
    res.send("estas en eliminacion de un usuario");
});

export default router;