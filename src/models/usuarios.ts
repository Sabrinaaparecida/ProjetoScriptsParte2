import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuarios = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
});

export default Usuarios;