import eventosModel from "../../models/eventosModel.js";
import gruposModel from "../../models/gruposModel.js";
import liantesModel from "../../models/liantesModel.js";
import  sequelize from "sequelize";
import usersModel from "../../models/usersModel.js";


  

const getAll = async(req,res) => {
  const id = Math.floor(Math.random()*10);
  try{
      const ranking = await usersModel.findAll({
          attributes: [
            'nombre',
            [sequelize.fn('count', sequelize.col('liantes.id_evento')), 'liadas']
          ],
          include: [
            {
              model: liantesModel,
              as:"liantes",
              attributes: [],
              include: {
                model: eventosModel,
                as:"liada",
                attributes: [],
              }
            },
            
          ],
          where: {'$liantes->liada.id_grupo$': id },
          group: ['usuarios.id_usuario'],
          order: [
            sequelize.literal('liadas DESC')
          ],
        });
      return ranking;
  }catch(e){
      return [e.message,null];
  }
} 


export default{
    getAll
}
