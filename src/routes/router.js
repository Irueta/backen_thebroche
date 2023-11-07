import { Router } from "express";
import usersRouter from "./usersRouter.js";
import authRouter from "./authRouter.js";
import gruposRouter from "./gruposRouter.js";
import eventosRouter from "./eventosRouter.js"
import adminRouter from "./adminRouter.js";
const router = Router();

router.use("/users",usersRouter);
router.use("/",authRouter);
router.use("/grupos",gruposRouter);
router.use("/eventos",eventosRouter);
router.use("/admin",adminRouter);

export default router;