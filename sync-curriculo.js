import sequelize from './config/database.js';
import Curriculo from './models/curriculo.js';

const sync = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Tabela 'curriculo' criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  } finally {
    await sequelize.close();
  }
};

sync();