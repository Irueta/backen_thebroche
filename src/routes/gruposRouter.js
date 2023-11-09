import { Router } from "express";
import gruposController from "../controllers/grupos/gruposController.js";
import authController from "../controllers/auth/authController.js";
import usersController from "../controllers/users/usersController.js";
import eventosController from "../controllers/eventos/eventosController.js";
import liantesController from "../controllers/liantes/liantesController.js";
import session from "express-session";
const router = Router();


router.get("/",async (req,res)=>{
    const grupos = await gruposController.getAll(req,res);
    res.render("grupos/list", {grupos})
   /* res.json(grupos) */
});

router.get("/myGroups",async (req,res)=>{
    const grupos = await gruposController.getByUser();
    const participantes = grupos[0].participantes;
    const eventos = grupos[0].eventos;
    const grupo = grupos[0].nombre; 
    /* res.send({participantes,eventos}) */
    res.render("grupos/show2", {participantes,eventos,grupo})
    /* res.json({participantes,eventos,grupo}) */
});

/* router.get("/myGroups",async (req,res)=>{
    const grupos = await gruposController.getByUser();
    res.render("grupos/show1", {grupos})
    res.json({grupos})
}); */

router.get("/create",(req,res)=>{
    gruposController.createForm(req,res);
    res.render("/grupos/create")
});

router.get("/myGroups/eventos/new",(req,res)=>{
    eventosController.createForm(req,res);
    res.render("/eventos/create")
});

router.post("/myGroups/new",(req,res)=>{
    gruposController.create(req,res);
})

router.get("/:id",async (req,res)=>{
    const id= req.params.id
    const grupo= await gruposController.getById(id);
    const datos = await gruposController.getByUser()
    const ranking = await liantesController.getAll()
    /* res.render("grupos/show", {grupo,datos,ranking}) */
    res.json({grupo,datos,ranking})
});



router.get("/:id/edit",(req,res)=>{
    res.send("estas en actualizacion de un usuario");
});


router.get("/:id/delete",(req,res)=>{
    res.send("estas en eliminacion de un usuario");
});

export default router;