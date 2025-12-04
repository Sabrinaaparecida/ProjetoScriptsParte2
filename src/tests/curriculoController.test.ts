import { jest, describe, it, expect, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { Request, Response } from 'express';

jest.unstable_mockModule('../models/curriculo.js', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.unstable_mockModule('../models/usuarios.js', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}));

const { showCurriculo, saveCurriculo } = await import('../controllers/curriculoController.js');
const { default: Curriculo } = await import('../models/curriculo.js');
const { default: Usuarios } = await import('../models/usuarios.js');

describe('Curriculo Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      locals: { userId: 1, userName: 'Teste' },
    };
    jest.clearAllMocks();
  });

  describe('showCurriculo', () => {
    it('deve renderizar o formulário com dados do currículo e usuário', async () => {
      const mockCurriculo = { id: 10, cargo: 'Dev' };
      const mockUser = { id: 1, nome: 'Teste' };

      (Curriculo.findOne as jest.Mock).mockResolvedValue(mockCurriculo);
      (Usuarios.findByPk as jest.Mock).mockResolvedValue(mockUser);

      await showCurriculo(req as Request, res as Response);

      expect(Curriculo.findOne).toHaveBeenCalledWith({ where: { usuarioId: 1 } });
      expect(res.render).toHaveBeenCalledWith('Curriculo', {
        curriculo: mockCurriculo,
        user: mockUser,
        userName: 'Teste'
      });
    });

    it('deve redirecionar para /home em caso de erro', async () => {
      (Curriculo.findOne as jest.Mock).mockRejectedValue(new Error('Erro DB'));

      await showCurriculo(req as Request, res as Response);

      expect(res.redirect).toHaveBeenCalledWith('/home');
    });
  });

  describe('saveCurriculo', () => {

    const bodyFormulario = {
      nome: 'Fulano',
      'status-curso': 'concluido', 
      'tempo-empresa': '2 anos',   
      cargo: 'Dev Senior'
    };

    it('deve CRIAR um novo currículo se não existir', async () => {
      req.body = bodyFormulario;

      (Curriculo.findOne as jest.Mock).mockResolvedValue(null);
      (Curriculo.create as jest.Mock).mockResolvedValue({});

      await saveCurriculo(req as Request, res as Response);

      expect(Curriculo.create).toHaveBeenCalledWith(expect.objectContaining({
        usuarioId: 1,
        nome: 'Fulano',
        statusCurso: 'concluido',     
        tempoExperiencia: '2 anos',   
        cargo: 'Dev Senior'
      }));
      expect(res.redirect).toHaveBeenCalledWith('/perfil');
    });

    it('deve ATUALIZAR um currículo existente', async () => {
      req.body = bodyFormulario;

      const mockCurriculoExistente = {
        id: 50,
        update: jest.fn().mockResolvedValue({})
      };

      (Curriculo.findOne as jest.Mock).mockResolvedValue(mockCurriculoExistente);

      await saveCurriculo(req as Request, res as Response);

      expect(Curriculo.create).not.toHaveBeenCalled();
      expect(mockCurriculoExistente.update).toHaveBeenCalledWith(expect.objectContaining({
        statusCurso: 'concluido',
        tempoExperiencia: '2 anos'
      }));
      expect(res.redirect).toHaveBeenCalledWith('/perfil');
    });

    it('deve redirecionar para /curriculo em caso de erro', async () => {
      req.body = bodyFormulario;
      // Força erro no findOne
      (Curriculo.findOne as jest.Mock).mockRejectedValue(new Error('Erro Fatal'));

      await saveCurriculo(req as Request, res as Response);

      expect(res.redirect).toHaveBeenCalledWith('/curriculo');
    });
  });
});