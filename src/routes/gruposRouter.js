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
        const grupos = await gruposController.getByUser(req,res);
        const ranking = await liantesController.getAll(req,res);
        if(grupos.length!==0){
            /* res.json({grupos,ranking})
            console.log(grupos[0].participantes[0].id_grupo) */
            res.render("grupos/show2", {grupos,ranking})
        }else{
            res.redirect("./create")
        }
});

router.get("/myGroups/:id",async (req,res)=>{
    const grupos = await gruposController.getByUser(req,res);
    if(grupos.length!==0){
        res.json({grupos})
        /* res.render("grupos/show2", {grupos}) */
    }else{
        res.redirect("./create")
    }
});

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
    const ranking = await liantesController.getAll(req,res);
    console.log("RANKING",ranking)
    /* res.render("grupos/show", {grupo,datos,ranking}) */
    res.json({grupo,ranking})
});



router.get("/:id/edit",(req,res)=>{
    res.send("estas en actualizacion de un usuario");
});


router.get("/:id/delete",(req,res)=>{
    res.send("estas en eliminacion de un usuario");
});

export default router;