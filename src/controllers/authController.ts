import { Request, Response } from 'express';
import Usuarios from '../models/usuarios.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body as LoginBody;

    if (!email || !senha) return res.render('Login', { error: 'Preencha todos os campos.' });

    const user = await Usuarios.findOne({ where: { email: email } });

    if (!user) return res.render('Login', { error: 'Email ou senha inválidos' });

    const senhaCorreta = await bcrypt.compare(senha, user.getDataValue('senha'));

    if (senhaCorreta) { 
      const id = user.getDataValue('id');
      const nome = user.getDataValue('nome');

      const token = jwt.sign(
        { userId: id, userName: nome },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' } 
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      });

      res.cookie('showToast', 'true', { maxAge: 5000 }); 

      res.redirect('/perfil');
    } else {
      res.render('Login', { error: 'Email ou senha inválidos' });
    }

  } catch (error) {
    console.error(error);
    res.render('Login', { error: 'Erro no servidor.' });
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
    const senhaHash = await bcrypt.hash(senha!, saltRounds);

    await Usuarios.create({
      nome: nome,
      email: email,
      senha: senhaHash
    });

    res.cookie('cadastroSucesso', 'true', { maxAge: 5000 });
    res.redirect('/');

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.render('cadastro', { error: 'Ocorreu um erro no servidor.' });
  }
};

export const handleLogout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.redirect('/');
};