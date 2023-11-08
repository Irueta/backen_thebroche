import { DataTypes, Model} from "sequelize";

import sequelize from "../config/sequelize.js";
import participantesModel from "./participantesModel.js";
import liantesModel from "./liantesModel.js";
import gruposModel from "./gruposModel.js";

const usersModel = sequelize.define("usuarios", 
{
    id_usuario:{
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    primer_apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3
    }
    }
);

liantesModel.belongsTo(usersModel, {
    foreignKey: "id_usuario",
    as: 'liante'
});
participantesModel.belongsTo(usersModel, {
    foreignKey: "id_usuario",
    as: 'participante'
});


usersModel.hasMany(liantesModel, { foreignKey: "id_usuario", as:"liantes"});
usersModel.hasMany(participantesModel, { foreignKey: "id_usuario" });

//HAU ZALANTZA
/* usersModel.belongsToMany(gruposModel, {through:"participantesModel"});
 */


export default usersModel;