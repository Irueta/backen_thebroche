import { DataTypes, BelongsToMany } from "sequelize";
import sequelize from "../config/sequelize.js";


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

/* eventosModel.belongsToMany(usuariosModel, {
    through: 'Liantes',
    foreignKey: 'id_evento',
    otherKey: 'id_usuario',
  }); */

export default eventosModel;