import { Sequelize } from 'sequelize';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'database', 'portal.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath, // Caminho para seu arquivo .db
  logging: false // Desativa os logs SQL no console (opcional)
});

export default sequelize;