import eventosModel from "../../models/eventosModel.js";
import gruposModel from "../../models/gruposModel.js";
import liantesModel from "../../models/liantesModel.js";
import  Sequelize from "sequelize";
import usersModel from "../../models/usersModel.js";

const getAll = async(req,res) => {
    const id = 3
    try{
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
        return ranking;
    }catch(e){
        return [e.message,null];
    }
}
export default{
    getAll
}
/* const id = 3;
const post = await gruposModel.findOne({
    where: { id_grupo: id },
    attributes: ["nombre", "title", "imageUrl", 
    // you probably need to correct the table and fields names
    [Sequelize.literal('(SELECT COUNT(*) FROM Likes where Likes.postId=Post.id)'), 'LikeCount']],
    include: [{
      model: User,
      as: "Likers",
      attributes: ["id"],
      through: { attributes: [] },
    }]
  }) */

  /* select usuarios.nombre , count(liantes.id_usuario) from usuarios join liantes on usuarios.id_usuario=liantes.id_usuario join eventos on eventos.id_evento=liantes.id_evento where eventos.id_grupo=1 group by usuarios.nombre; */