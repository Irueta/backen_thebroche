import gruposModel from "../../models/gruposModel.js";
import participantesModel from "../../models/participantesModel.js";
import usersModel from "../../models/usersModel.js";
import {Op} from "sequelize";

const getAll = async() => {
    try{
        const users = await usersModel.findAll();
        /* return [null, users]; */
        return users;
    }catch(e){
        return [e.message,null];
    }
}


const getByIdGrupo = async (id) => {
    const idGrupo = id;
    try {
        const usuarios = await usersModel.findAll({
          attributes: ['nombre', 'primer_apellido', 'segundo_apellido', 'email'],
          include:[
              {
                model:participantesModel,
                /* as:"participante", */
                include: [{
                    model:gruposModel, 
                    /* as:"grupo", */ 
                    where: {
                        id_grupo: idGrupo
                      }

                    }
                ]
              }
          ]
        });
    
        console.log(usuarios);
      } catch (error) {
        console.error('Error:', error);
      }
    }

const getById = async (id) => {
    try {
        const usuario = await usersModel.findByPk(id);
        console.log(usuario)
        return usuario;
    }
    catch (e) {
        return [e.message, null];
    }
}


const update = async(req,res) => {
        const {nombre,primer_apellido,segundo_apellido,password,passwordConfirm} = req.body;
        if(password !== passwordConfirm){
            const errorUri = encodeURIComponent("Las contraseñas no coinciden");
            return res.redirect("/register?error=" + errorUri);
        }
    
        try{
            console.log(hash);
            const user= await usersModel.findByPk(id);
            if(nombre===!undefined){
            user.nombre=nombre;
            }
            if (primer_apellido ===!undefined) {
                user.primer_apellido=primer_apellido;
            }
            if (segundo_apellido ===!undefined) {
                user.segundo_apellido=segundo_apellido;
            }
            if (password===!undefined){
                const hash = await bcrypt.hash(password,10);
                user.password=hash
        }
        user.save();
        return [null,user];
    }
    catch (e) {
        console.log(e)
        return [e.message,null];
    }
};

const remove = async (id) => {
    try {
        const user = await usersModel.findByPk(id);
        if(!user){
            const error = "No se ha encontrado ningún elemento con ese ID";
            return[error,null];
        }
        user.destroy();
        return [null,user];
    }
    catch (e) {
        return [e.message,null];
    }
}


export default {
    getAll,
    getById,
    update,
    remove,
    getByIdGrupo
};
