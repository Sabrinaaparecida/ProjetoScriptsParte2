import Usuarios from '../models/usuarios.js';
import bcrypt from 'bcrypt';

// Função para processar o formulário de login
export const handleLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Procura o usuário no banco (igual)
    const user = await Usuarios.findOne({ where: { email: email } });

    // 2. Verifica se o usuário existe
    if (!user) {
      // Se o usuário NÃO existe, já falha aqui
      return res.render('Login', { error: 'Email ou senha inválidos' });
    }

    // 3. (A MUDANÇA) Compara a senha digitada com o hash salvo
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (senhaCorreta) {
      req.session.userId = user.id;
      req.session.userName = user.nome;
      req.session.showWelcomeToast = true;
      res.redirect('/perfil');
    } else {
      // FALHA! A senha não bate com o hash
      res.render('Login', { error: 'Email ou senha inválidos' });
    }

  } catch (error) {
    console.error('Erro no login:', error);
    res.render('Login', { error: 'Ocorreu um erro no servidor.' });
  }
};

export const handleRegister = async (req, res) => {
  try {
    const { nome, email, senha, confirmarSenha } = req.body;

    // 1. Validação Simples
    if (senha !== confirmarSenha) {
      return res.render('cadastro', { error: 'As senhas não conferem!' });
    }

    // 2. Verificar se o usuário já existe
    const userExists = await Usuarios.findOne({ where: { email: email } });
    if (userExists) {
      return res.render('cadastro', { error: 'Este email já está cadastrado.' });
    }

    // 3. Criptografar a senha (O MAIS IMPORTANTE)
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // 4. Salvar no banco
    await Usuarios.create({
      nome: nome,
      email: email,
      senha: senhaHash // Salva o hash, não a senha pura!
    });

    // 5. Redirecionar para o login para ele entrar
    res.redirect('/'); // Ou pode ser '/login' se sua rota raiz mudar

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.render('cadastro', { error: 'Ocorreu um erro no servidor.' });
  }
};

export const handleLogout = (req, res) => {
  // Destrói a sessão
  req.session.destroy((err) => {
    if (err) {
      // Se der erro ao destruir, só loga e segue
      console.error('Erro ao fazer logout:', err);
    }
    // Limpa o cookie (boa prática)
    res.clearCookie('connect.sid'); 
    // Redireciona para o login
    res.redirect('/');
  });
};