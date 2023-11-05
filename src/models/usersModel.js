import { DataTypes, Model} from "sequelize";

import sequelize from "../config/sequelize.js";
import gruposModel from "./gruposModel.js";
import participantesModel from "./participantesModel.js";

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





export default usersModel;