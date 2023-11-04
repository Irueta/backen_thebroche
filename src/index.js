import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import {Sequelize} from "sequelize";

dotenv.config();
const app = express();


app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home");
});

app.use("/",router);

app.listen(3005,()=>{
    console.log("servidor en marcha en el puerto 3005");
});
