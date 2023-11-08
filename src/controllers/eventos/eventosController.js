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

export default {
    getAll,
    getById,
    getByIdGrupo
};
