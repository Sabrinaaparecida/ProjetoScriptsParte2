import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuarios from './usuarios.js';

const Curriculo = sequelize.define('Curriculo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false 
    },
  cpf: { 
    type: DataTypes.STRING,
    allowNull: false 
    },
  email: {
    type: DataTypes.STRING,
    allowNull: false 
    },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false 
    },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false 
    },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true },
  
  status: {
    type: DataTypes.STRING, allowNull: true 
    },


  resumo: {
     type: DataTypes.TEXT,
     allowNull: true },

  curso: { type: DataTypes.STRING, allowNull: true },
  faculdade: { type: DataTypes.STRING, allowNull: true },

  statusCurso: { type: DataTypes.STRING, allowNull: true }, 

  cargo: { type: DataTypes.STRING, allowNull: true },
  empresa: { type: DataTypes.STRING, allowNull: true },
  tempoExperiencia: { type: DataTypes.STRING, allowNull: true },

  
  habilidades: { 
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: "[]"
  }

}, {
  tableName: 'curriculos',
  timestamps: true,
});

Curriculo.belongsTo(Usuarios, { foreignKey: 'usuarioId' });

export default Curriculo;