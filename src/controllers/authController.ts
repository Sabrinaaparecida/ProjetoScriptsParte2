import { Request, Response } from 'express';
import Usuarios from '../models/usuarios.js';
import bcrypt from 'bcrypt';

interface LoginBody {
  email?: string;
  senha?: string;
}

interface RegisterBody {
  nome?: string;
  email?: string;
  senha?: string;
  confirmarSenha?: string;
}

// Função para processar o formulário de login
export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body as LoginBody;

    if (!email || !senha) {
        return res.render('Login', { error: 'Preencha todos os campos.' });
    }

    // 1. Procura o usuário no banco (igual)
    const user = await Usuarios.findOne({ where: { email: email } });

    // 2. Verifica se o usuário existe
    if (!user) {
      // Se o usuário NÃO existe, já falha aqui
      return res.render('Login', { error: 'Email ou senha inválidos' });
    }

    // 3. (A MUDANÇA) Compara a senha digitada com o hash salvo
    const senhaCorreta = await bcrypt.compare(senha, user.getDataValue('senha'));

    if (senhaCorreta) {
      req.session.userId = user.getDataValue('id');
      req.session.userName = user.getDataValue('nome');
      req.session.showWelcomeToast = true;
      
      res.redirect('/perfil');
    } else {
      res.render('Login', { error: 'Email ou senha inválidos' });
    }

  } catch (error) {
    console.error('Erro no login:', error);
    res.render('Login', { error: 'Ocorreu um erro no servidor.' });
  }
};

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, confirmarSenha } = req.body as RegisterBody;

    if (!senha || senha !== confirmarSenha) {
      return res.render('cadastro', { error: 'As senhas não conferem!' });
    }

    const userExists = await Usuarios.findOne({ where: { email: email } });
    if (userExists) {
      return res.render('cadastro', { error: 'Este email já está cadastrado.' });
    }

    const saltRounds = 10;
    // O '!' garante pro TS que senha não é undefined (já checamos no if acima)
    const senhaHash = await bcrypt.hash(senha!, saltRounds);

    await Usuarios.create({
      nome: nome,
      email: email,
      senha: senhaHash
    });

    res.redirect('/');

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.render('cadastro', { error: 'Ocorreu um erro no servidor.' });
  }
};

export const handleLogout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
    }
    res.clearCookie('connect.sid'); 
    res.redirect('/');
  });
};