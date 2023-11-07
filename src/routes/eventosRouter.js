import { Router } from "express";
import eventosController from "../controllers/eventos/eventosController.js";

const router = Router();

router.get("/",async (req,res)=>{
    const eventos = await eventosController.getAll(req,res);
    res.render("eventos/list", {eventos})
   /* res.json(eventos) */
});

router.get("/:id",async (req,res)=>{
    const id= req.params.id
    const evento= await eventosController.getById(id);
    res.json(eventos)
    /* res.render("eventos/show", {evento}) */
});

export default router;