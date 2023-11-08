import gruposModel from "../../models/gruposModel.js";
import usuariosModel from "../../models/usersModel.js";
import participantesModel from "../../models/participantesModel.js";
import {Sequelize} from "sequelize";
import { QueryTypes } from 'sequelize';
import eventosModel from "../../models/eventosModel.js";


const getAll = async(q=null) => {
    
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


const getByUser = async function obtenerGruposDeUsuario() {
    const id = 3;
    
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
      });
  
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
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

      res.redirect("/login");
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


const update = async(id,tipo,peso) => {
    
    if(id == undefined){
        const error = "Tienes que especificar un ID válido";
        return [error,null];
    }
    if (tipo === undefined || peso === undefined) {
        const error = "Tipo y peso deben ser definidos";
        return [error, null];
    }
    if (peso < 0 || peso > 255){
        const error = "El peso debe estar entre 0 y 255 (incluidos)";
        return [error,null];
    }
    try {
        console.log("id",id);
        const aceituna= await aceitunasModel.findByPk(id);
        aceituna.tipo = tipo;
        aceituna.peso = peso;
        aceituna.save();
        return [null,aceituna];
    }
    catch (e) {
        console.log(e)
        return [e.message,null];
    }
};

const remove = async (id) => {
    try {
        const aceituna = await aceitunasModel.findByPk(id);
        if(!aceituna){
            const error = "No se ha encontrado ningún elemento con ese ID";
            return[error,null];
        }
        aceituna.destroy();
        return [null,aceituna];
    }
    catch (e) {
        return [e.message,null];
    }
}


export default {
    getAll,
    getByUser,
    getById,
    create,
    update,
    remove,
    createForm
};
