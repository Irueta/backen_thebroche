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
    const id=req.session.user.id;
    const grupo = req.body.grupo;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    if(!nombre || !grupo || !descripcion || !fecha){
        const errorUri = encodeURIComponent("Introduce todos los datos");
        return res.redirect("/grupos/myGroups?error=" + errorUri);
    }
    
    try{
        const newEvento = await eventosModel.create({
            id_grupo:grupo,
            nombre:nombre,
            descripcion:descripcion,
            fecha:fecha

        });
        const newParticipante = await participantesModel.create({
            id_evento:newEvento.id_grupo,
            id_usuario:id
        })
        res.redirect("/grupos/myGroups")
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


  