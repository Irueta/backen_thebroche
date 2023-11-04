import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";


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



  
export default gruposModel;