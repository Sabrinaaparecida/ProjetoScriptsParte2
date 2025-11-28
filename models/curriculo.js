import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuarios from './usuarios.js'; // Importante para criar a relação (opcional mas bom)

const Curriculo = sequelize.define('Curriculo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true // Um usuário só tem um currículo
  },
  // --- INFORMAÇÕES PESSOAIS ---
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
  
  // --- STATUS (Radio Button) ---
  // Vai salvar o valor do value (ex: "aberto-a-propostas")
  status: {
    type: DataTypes.STRING, allowNull: true 
    },

  // --- RESUMO ---
  resumo: {
     type: DataTypes.TEXT,
     allowNull: true },

  // --- FORMAÇÃO ---
  curso: { type: DataTypes.STRING, allowNull: true },
  faculdade: { type: DataTypes.STRING, allowNull: true },
  // Vai salvar "em-andamento", "concluido", etc.
  statusCurso: { type: DataTypes.STRING, allowNull: true }, 

  // --- EXPERIÊNCIA ---
  cargo: { type: DataTypes.STRING, allowNull: true },
  empresa: { type: DataTypes.STRING, allowNull: true },
  // Vai salvar "1-3", "mais-de-5", etc.
  tempoExperiencia: { type: DataTypes.STRING, allowNull: true },

  // --- HABILIDADES ---
  // Vamos salvar como TEXTO longo. 
  // O JavaScript vai converter a lista em texto antes de enviar.
  habilidades: { 
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: "[]" // Começa como uma lista vazia
  }

}, {
  tableName: 'curriculos',
  timestamps: true,
});

// Define a relação: Um Curriculo pertence a um Usuario
Curriculo.belongsTo(Usuarios, { foreignKey: 'usuarioId' });

export default Curriculo;