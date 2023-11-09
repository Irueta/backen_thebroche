import gruposModel from "../../models/gruposModel.js";
import usuariosModel from "../../models/usersModel.js";
import participantesModel from "../../models/participantesModel.js";
import {Sequelize} from "sequelize";
import { QueryTypes } from 'sequelize';
import eventosModel from "../../models/eventosModel.js";
import session from "express-session";
import authController from "../auth/authController.js";


const getAll = async(req,res) => {
    
    /* const options = {};
    if(q) {
        options.where = { nombre:"Admin",}
    } */
    try{
        const grupos = await gruposModel.findAll();
        return grupos;
    }catch(e){
        return [e.message,null];
    }; 
}


const getByUser = async function obtenerGruposDeUsuario(req,res) {
  if(req.session.user.id){
    const id = req.session.user.id;
      console.log(id)
      try {
        const grupos = await gruposModel.findAll({
          attributes: ['id_grupo'],
          include: [
            {
              model: participantesModel,
              attributes: [],
              where: {
                id_usuario: id
              },
            }
          ]
        });

          const gruposIds = grupos.map(grupo => grupo.id_grupo);
          
          const result = await gruposModel.findAll({
            attributes: ['nombre'],
            where:{
                id_grupo:{
                    [Sequelize.Op.in]: gruposIds
                }
            },
            include: [
              {
                model: participantesModel,
                
                include: [
                  {
                    model: usuariosModel,
                    attributes: ['nombre','email'],
                    as: 'participante',
                  }
                ]
              },
              {
                model: eventosModel,
                as: "eventos"
              }
            ]
          })
        
          if(result!==undefined || result !==null){
            return result;
          }
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
  }else{
    res.redirect("/login")
  }
  }
 

const getById = async (id) => {
    try {
        const grupos = await gruposModel.findByPk(id);
        return grupos;
    }
    catch (e) {
        return [e.message, null];
    }
}

const create = async (req,res) => {
  const nombre = req.body.nombre;
  const idAdmin = req.session.user.id;
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
        
        const newParticipante = await participantesModel.create({
          id_grupo:newGroup.id_grupo,
          id_usuario:idAdmin
    });
      res.redirect("/grupos/myGroups");
  }
  catch(e){
      const errorUri= encodeURIComponent(e.message);
      return res.redirect("/grupos/myGroups?error=" + errorUri);
  }    
}
const createForm = (req,res) => {
  const errorMessage = req.query.error
  res.render("grupos/create",{error:errorMessage});
}





export default {
    getAll,
    getByUser,
    getById,
    create,
    createForm
};
