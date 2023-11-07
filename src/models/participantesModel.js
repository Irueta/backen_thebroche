import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";



const participantesModel = sequelize.define("participantes", 
{
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_grupo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
    }
);


export default participantesModel;