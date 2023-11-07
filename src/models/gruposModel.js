import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";
import eventosModel from "./eventosModel.js";
import participantesModel from "./participantesModel.js";

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

eventosModel.belongsTo(gruposModel, {
    foreignKey: "id_grupo",
    as: 'evento'
});
participantesModel.belongsTo(gruposModel, {
    foreignKey: "id_grupo",
    as: 'grupo'
});


gruposModel.hasMany(eventosModel, { foreignKey: "id_evento" });
gruposModel.hasMany(participantesModel, { foreignKey: "id_grupo" });


  
export default gruposModel;