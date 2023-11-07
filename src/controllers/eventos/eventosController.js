import eventosModel from "../../models/eventosModel.js";

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
        return evento;
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
