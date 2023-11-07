import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";



const participantesModel = sequelize.define("participantes", 
{
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_grupo:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }
);


export default participantesModel;