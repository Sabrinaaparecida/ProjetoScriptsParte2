import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Request, Response } from 'express';


jest.unstable_mockModule('../models/usuarios.js', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}));

jest.unstable_mockModule('../models/curriculo.js', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

const { showPerfil } = await import('../controllers/userController.js');
const { default: Usuarios } = await import('../models/usuarios.js');
const { default: Curriculo } = await import('../models/curriculo.js');

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      cookies: {},
    };
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      clearCookie: jest.fn(),
      locals: { userId: 1 },
    };
    jest.clearAllMocks();
  });

  describe('showPerfil', () => {
    it('deve renderizar o perfil com dados do usuário e currículo', async () => {
      const mockUser = { id: 1, nome: 'Teste' };
      const mockCurriculo = { resumo: 'Desenvolvedor Fullstack' };

      (Usuarios.findByPk as jest.Mock).mockResolvedValue(mockUser);
      (Curriculo.findOne as jest.Mock).mockResolvedValue(mockCurriculo);

      await showPerfil(req as Request, res as Response);
    
      expect(Usuarios.findByPk).toHaveBeenCalledWith(1); 
      expect(Curriculo.findOne).toHaveBeenCalledWith({ where: { usuarioId: 1 } });

      expect(res.render).toHaveBeenCalledWith('Perfil', expect.objectContaining({
        user: mockUser,
        curriculo: mockCurriculo,
        showWelcomeToast: false,
        labelsTempo: expect.any(Object),
        labelsStatus: expect.any(Object),
        labelsStatusProfissional: expect.any(Object)
      }));
    });

    it('deve limpar o cookie showToast se ele estiver true', async () => {
      req.cookies = { showToast: 'true' }; 
      (Usuarios.findByPk as jest.Mock).mockResolvedValue({});
      (Curriculo.findOne as jest.Mock).mockResolvedValue({});

      await showPerfil(req as Request, res as Response);

      expect(res.clearCookie).toHaveBeenCalledWith('showToast');
      expect(res.render).toHaveBeenCalledWith('Perfil', expect.objectContaining({
        showWelcomeToast: true
      }));
    });

    it('NÃO deve limpar cookie se showToast não existir', async () => {
      req.cookies = {}; 
      (Usuarios.findByPk as jest.Mock).mockResolvedValue({});
      (Curriculo.findOne as jest.Mock).mockResolvedValue({});

      await showPerfil(req as Request, res as Response);

      expect(res.clearCookie).not.toHaveBeenCalled();
    });

    it('deve redirecionar para / em caso de erro no banco', async () => {
      (Usuarios.findByPk as jest.Mock).mockRejectedValue(new Error('Erro DB'));

      await showPerfil(req as Request, res as Response);

      expect(res.render).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });
});