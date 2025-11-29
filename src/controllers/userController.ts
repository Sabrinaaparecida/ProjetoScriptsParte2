import { Request, Response } from 'express';
import Usuarios from '../models/usuarios.js';
import Curriculo from '../models/curriculo.js';

const LABELS_TEMPO = {
  'menos-de-1': 'Menos de 1 ano',
  '1-3': '1-3 anos',
  '3-5': '3-5 anos',
  'mais-de-5': 'Mais de 5 anos'
};

const LABELS_STATUS_CURSO = {
  'em-andamento': 'Em andamento',
  'concluido': 'Concluído',
  'nao-finalizado': 'Não finalizado'
};

const LABELS_STATUS_PROFISSIONAL = {
  'disponivel': 'Disponível para mercado',
  'nao-disponivel': 'Não disponível',
  'aberto-a-propostas': 'Aberto a propostas',
  'em-transicao': 'Em transição de carreira'
};

// --- MOSTRAR O PERFIL (Dashboard) ---
export const showPerfil = async (req: Request, res: Response) => {
  try {
    // O TS sabe que 'userId' existe por causa do arquivo types/express-session.d.ts
    const userId = req.session.userId;

    // 1. Busca o Usuário
    const user = await Usuarios.findByPk(userId);

    // 2. Busca o Currículo
    const curriculo = await Curriculo.findOne({ where: { usuarioId: userId } });

    // 3. Lógica do Toast
    const showToast = req.session.showWelcomeToast;
    delete req.session.showWelcomeToast; 

    // 4. Renderiza a tela
    res.render('perfil', {
      user: user,
      curriculo: curriculo,
      showWelcomeToast: showToast,
      labelsTempo: LABELS_TEMPO,
      labelsStatus: LABELS_STATUS_CURSO,
      labelsStatusProfissional: LABELS_STATUS_PROFISSIONAL
    });

  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    res.redirect('/');
  }
};
