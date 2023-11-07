import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import liantesModel from "./liantesModel.js";


const eventosModel = sequelize.define("eventos", 
{
    id_evento:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_grupo:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false
    },
    nombre:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
    }
);


liantesModel.belongsTo(eventosModel, {
    foreignKey: "id_evento",
    as: 'liada'
});



eventosModel.hasMany(liantesModel, { foreignKey: "id_evento" });


export default eventosModel;