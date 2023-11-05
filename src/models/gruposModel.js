import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";
import usersModel from "./usersModel.js";

const gruposModel = sequelize.define("grupos", 
{
    id_grupo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_admin:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }
);



/* 
gruposModel.belongsToMany(usersModel, {
    through: "participantes", 
    foreignKey:'id_grupo',
    otherKey:'id_usuario'
}); */

  
export default gruposModel;