import eventosModel from "../../models/eventosModel.js";

const getAll = async() => { 
    try{
        const eventos = await eventosModel.findAll();
        return eventos;
    }catch(e){
        return [e.message,null];
    };
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

export default {
    getAll,
    getById
};
