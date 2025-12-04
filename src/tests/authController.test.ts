import { jest, describe, it, expect, beforeEach, beforeAll } from '@jest/globals';
import { Request, Response } from 'express';

jest.unstable_mockModule('../models/usuarios.js', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
    build: jest.fn(),
  },
}));

jest.unstable_mockModule('bcrypt', () => ({
  default: {
    compare: jest.fn(),
    hash: jest.fn(),
  },
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn(),
  },
  sign: jest.fn(),
}));

const { handleLogin, handleRegister, handleLogout } = await import('../controllers/authController.js');
const { default: Usuarios } = await import('../models/usuarios.js');
const { default: bcrypt } = await import('bcrypt');
const { default: jwt } = await import('jsonwebtoken');

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      clearCookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('handleLogin', () => {
    it('deve retornar erro se faltar email ou senha', async () => {
      req.body = { email: 'teste@teste.com' }; 

      await handleLogin(req as Request, res as Response);

      expect(res.render).toHaveBeenCalledWith('Login', { error: 'Preencha todos os campos.' });
    });

    it('deve retornar erro se usuário não for encontrado', async () => {
      req.body = { email: 'naoexiste@teste.com', senha: '123' };
      
      (Usuarios.findOne as jest.Mock).mockResolvedValue(null);

      await handleLogin(req as Request, res as Response);

      expect(res.render).toHaveBeenCalledWith('Login', { error: 'Email ou senha inválidos' });
    });

    it('deve logar com sucesso e gerar cookies', async () => {
      req.body = { email: 'certo@teste.com', senha: '123' };

      const mockUserSequelize = {
        getDataValue: jest.fn((campo) => {
          const dados: any = { id: 1, nome: 'João', senha: 'hash_segura' };
          return dados[campo];
        })
      };

      (Usuarios.findOne as jest.Mock).mockResolvedValue(mockUserSequelize);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token_jwt_valido');

      await handleLogin(req as Request, res as Response);

      expect(bcrypt.compare).toHaveBeenCalledWith('123', 'hash_segura');
      expect(res.redirect).toHaveBeenCalledWith('/perfil');
    });

    it('deve retornar erro se a senha estiver incorreta', async () => {
      req.body = { email: 'certo@teste.com', senha: 'errada' };
      
      const mockUserSequelize = { getDataValue: jest.fn(() => 'hash_real') };
      
      (Usuarios.findOne as jest.Mock).mockResolvedValue(mockUserSequelize);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await handleLogin(req as Request, res as Response);

      expect(res.render).toHaveBeenCalledWith('Login', { error: 'Email ou senha inválidos' });
    });
  });

  describe('handleRegister', () => {
    it('deve bloquear se senhas não conferem', async () => {
      req.body = { nome: 'A', email: 'a@a.com', senha: '123', confirmarSenha: '456' };

      await handleRegister(req as Request, res as Response);

      expect(res.render).toHaveBeenCalledWith('cadastro', { error: 'As senhas não conferem!' });
    });

    it('deve criar usuário e redirecionar', async () => {
      req.body = { nome: 'Novo', email: 'novo@a.com', senha: '123', confirmarSenha: '123' };
      
      (Usuarios.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hash_criada');
      (Usuarios.create as jest.Mock).mockResolvedValue({ id: 10 });

      await handleRegister(req as Request, res as Response);

      expect(Usuarios.create).toHaveBeenCalledWith({
        nome: 'Novo',
        email: 'novo@a.com',
        senha: 'hash_criada'
      });
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });

  describe('handleLogout', () => {
    it('deve limpar cookie e redirecionar', () => {
      handleLogout(req as Request, res as Response);
      
      expect(res.clearCookie).toHaveBeenCalledWith('jwt');
      expect(res.redirect).toHaveBeenCalledWith('/');
    });
  });
});