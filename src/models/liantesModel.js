import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";


const liantesModel = sequelize.define("liantes", 
{
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_evento:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }
);


export default liantesModel;