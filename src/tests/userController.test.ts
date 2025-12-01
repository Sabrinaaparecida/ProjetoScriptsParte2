import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Request, Response } from 'express';

// --- 1. MOCKS (Definidos ANTES dos imports) ---

// Mock do Model Usuarios
jest.unstable_mockModule('../models/usuarios.js', () => ({
  __esModule: true,
  default: {
    findByPk: jest.fn(),
  },
}));

// Mock do Model Curriculo
jest.unstable_mockModule('../models/curriculo.js', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

// --- 2. IMPORTS DINÂMICOS ---
const { showPerfil } = await import('../controllers/userController.js');
const { default: Usuarios } = await import('../models/usuarios.js');
const { default: Curriculo } = await import('../models/curriculo.js');

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      cookies: {}, // Inicializa cookies vazio
    };
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      clearCookie: jest.fn(),
      locals: { userId: 1 }, // IMPORTANTE: Simula o ID que vem do middleware
    };
    jest.clearAllMocks();
  });

  describe('showPerfil', () => {
    it('deve renderizar o perfil com dados do usuário e currículo', async () => {
      // Setup dos dados falsos
      const mockUser = { id: 1, nome: 'Teste' };
      const mockCurriculo = { resumo: 'Desenvolvedor Fullstack' };

      // Configura os mocks do banco
      (Usuarios.findByPk as jest.Mock).mockResolvedValue(mockUser);
      (Curriculo.findOne as jest.Mock).mockResolvedValue(mockCurriculo);

      await showPerfil(req as Request, res as Response);

      // Verificações
      expect(Usuarios.findByPk).toHaveBeenCalledWith(1); // Veio do res.locals.userId
      expect(Curriculo.findOne).toHaveBeenCalledWith({ where: { usuarioId: 1 } });

      // Verifica se renderizou a página certa com os objetos certos
      expect(res.render).toHaveBeenCalledWith('Perfil', expect.objectContaining({
        user: mockUser,
        curriculo: mockCurriculo,
        showWelcomeToast: false, // Default é false
        // Verificamos se as labels estão presentes (não precisa checar o conteúdo exato de todas)
        labelsTempo: expect.any(Object),
        labelsStatus: expect.any(Object),
        labelsStatusProfissional: expect.any(Object)
      }));
    });

    it('deve limpar o cookie showToast se ele estiver true', async () => {
      req.cookies = { showToast: 'true' }; // Simula o cookie presente
      (Usuarios.findByPk as jest.Mock).mockResolvedValue({});
      (Curriculo.findOne as jest.Mock).mockResolvedValue({});

      await showPerfil(req as Request, res as Response);

      expect(res.clearCookie).toHaveBeenCalledWith('showToast');
      expect(res.render).toHaveBeenCalledWith('Perfil', expect.objectContaining({
        showWelcomeToast: true
      }));
    });

    it('NÃO deve limpar cookie se showToast não existir', async () => {
      req.cookies = {}; // Sem cookie
      (Usuarios.findByPk as jest.Mock).mockResolvedValue({});
      (Curriculo.findOne as jest.Mock).mockResolvedValue({});

      await showPerfil(req as Request, res as Response);

      expect(res.clearCookie).not.toHaveBeenCalled();
    });

    it('deve redirecionar para / em caso de erro no banco', async () => {
      // Força erro no banco
      (Usuarios.findByPk as jest.Mock).mockRejectedValue(new Error('Erro DB'));

      await showPerfil(req as Request, res as Response);

      expect(res.render).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });
});