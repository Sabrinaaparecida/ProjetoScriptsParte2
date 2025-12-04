// controllers/curriculoController.js
import { Request, Response } from 'express';
import Curriculo from '../models/curriculo.js';
import Usuarios from '../models/usuarios.js';

interface CurriculoBody {
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  linkedin?: string;
  status?: string;
  resumo?: string;
  curso?: string;
  faculdade?: string;
  'status-curso'?: string;
  cargo?: string;
  empresa?: string;
  'tempo-empresa'?: string;
  habilidades?: string;
}

export const showCurriculo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const curriculo = await Curriculo.findOne({ where: { usuarioId: userId } });
    const user = await Usuarios.findByPk(userId);

    res.render('Curriculo', {
      curriculo: curriculo,
      user: user,
      userName: res.locals.userName
    });

  } catch (error) {
    console.error('Erro ao abrir currículo:', error);
    res.redirect('/home');
  }
};

export const saveCurriculo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    
    const body = req.body as CurriculoBody; 

    const dadosFormulario = {
      usuarioId: userId,
      nome: body.nome,
      cpf: body.cpf,
      email: body.email,
      telefone: body.telefone,
      cidade: body.cidade,
      linkedin: body.linkedin,
      status: body.status,
      resumo: body.resumo,
      curso: body.curso,
      faculdade: body.faculdade,
      statusCurso: body['status-curso'],
      cargo: body.cargo,
      empresa: body.empresa,
      tempoExperiencia: body['tempo-empresa'],
      habilidades: body.habilidades
    };

    const curriculoExistente = await Curriculo.findOne({ where: { usuarioId: userId } });

    if (curriculoExistente) {
      await curriculoExistente.update(dadosFormulario);
      console.log("Currículo atualizado!");
    } else {
      await Curriculo.create(dadosFormulario);
      console.log("Currículo criado!");
    }

    res.redirect('/perfil');

  } catch (error) {
    console.error('Erro ao salvar currículo:', error);
    res.redirect('/curriculo');
  }
};