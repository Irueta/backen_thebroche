import { Router } from "express";
import eventosController from "../controllers/eventos/eventosController.js";
import liantesController from "../controllers/liantes/liantesController.js";
const router = Router();

router.get("/",async (req,res)=>{
    const eventos = await eventosController.getAll(req,res);
    res.render("eventos/list", {eventos})
   /* res.json(eventos) */
});

router.get("/:id",async (req,res)=>{
    const id= req.params.id
    const eventoYUsuarios= await eventosController.getById(id);
    /* res.json({eventoYUsuarios}) */
    res.render("eventos/show", {eventoYUsuarios})
});

router.post("/grupos/myGroups/eventos/new",async(req,res)=>{
    eventosController.create(req,res)
})



export default router;
