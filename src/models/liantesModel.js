import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";


const liantesModel = sequelize.define("liantes", 
{
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_evento:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
    }
);


export default liantesModel;