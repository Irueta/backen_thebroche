import { Router } from "express";
import gruposController from "../controllers/grupos/gruposController.js";
import authController from "../controllers/auth/authController.js";
import usersController from "../controllers/users/usersController.js";
import eventosController from "../controllers/eventos/eventosController.js";
import session from "express-session";
const router = Router();


router.get("/",async (req,res)=>{
    const grupos = await gruposController.getAll(req,res);
    res.render("grupos/list", {grupos})
   /* res.json(grupos) */
});

router.get("/myGroups",async (req,res)=>{
    const grupos = await gruposController.getByUser(req,res);
    const participantes = grupos[0].participantes;
    const eventos = grupos[0].eventos;
    const grupo = grupos[0].nombre;
    /* res.send({participantes,eventos}) */
    res.render("grupos/show2", {participantes,eventos,grupo})
    /* res.json({participantes,eventos,grupo}) */
});

router.get("/myGroups/new",(req,res)=>{
    gruposController.createForm(req,res);
});

router.post("/myGroups/new",(req,res)=>{
    gruposController.create(req,res);
})

router.get("/:id",async (req,res)=>{
    const id= req.params.id
    const grupo= await gruposController.getById(id);
    const datos = await gruposController.getByUser()
    res.render("grupos/show", {grupo,datos})
});
/* console.log(datos.eventos)
res.json({grupo,datos}) */


router.get("/:id/edit",(req,res)=>{
    res.send("estas en actualizacion de un usuario");
});


router.get("/:id/delete",(req,res)=>{
    res.send("estas en eliminacion de un usuario");
});

export default router;