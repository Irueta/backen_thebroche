import eventosModel from "../../models/eventosModel.js";
import liantesModel from "../../models/liantesModel.js";
import usersModel from "../../models/usersModel.js";

const getAll = async(q=null) => {
    try{
        const eventos = await eventosModel.findAll();
        /* return [null, eventos]; */
        return eventos;
    }catch(e){
        return [e.message,null];
    }
}


const getById = async (id) => {
    try {
        const evento = await eventosModel.findByPk(id);
        console.log(evento)
        const usuarios = await usersModel.findAll({
            attributes: ['nombre', 'primer_apellido'],
            include:[
                {
                        model:liantesModel, 
                        as:"liantes",
                        where: {
                            id_evento: evento.id_evento
                        }
                        
                    }
                ]
        });
        console.log(evento)
        console.log(usuarios)
        return {evento, usuarios};






    }
    catch (e) {
        return [e.message, null];
    }
}


const getByIdGrupo = async (id) => {
    const idGrupo = id;
    try {
        const eventos = await eventosModel.findAll({
          attributes: ['nombre', 'descripcion'],
          where: {
            id_grupo: idGrupo
          }
        });
    
        console.log(eventos);
      } catch (error) {
        console.error('Error:', error);
      }
    }

const createForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("eventos/create",{error:errorMessage});
    }

const create = async (req,res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const grupo = req.body.grupo;

    console.log(req.body)
    console.log(req.session.user.id)
    if(!nombre){
        const errorUri = encodeURIComponent("Introduce un nombre valido");
        return res.redirect("/grupos/myGroups?error=" + errorUri);
    }
    
    try{
        const oldGroup = await gruposModel.findOne({
            where:{
                nombre:nombre
            }
        });
    
        if(oldGroup){
            console.log("oldGroup:",oldGroup);
            const errorUri = encodeURIComponent("El grupo ya existe");
            return res.redirect("/grupos/myGroups?error=" + errorUri);
        }
        
        const newGroup = await gruposModel.create({
            nombre:nombre,
            id_admin:idAdmin
        });
    
        res.redirect("/login");
    }
    catch(e){
        const errorUri= encodeURIComponent(e.message);
        return res.redirect("/grupos/myGroups?error=" + errorUri);
    }    
    }

export default {
    getAll,
    getById,
    getByIdGrupo,
    createForm,
    create
};


  