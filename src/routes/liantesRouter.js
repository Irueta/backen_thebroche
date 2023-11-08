import liantesController from "../controllers/liantes/liantesController.js";

import { Router } from "express";


const router = Router();

router.get("/",async (req,res)=>{
    const ranking= await liantesController.getAll();
    console.log(ranking)
    res.json(ranking)
});


export default router;