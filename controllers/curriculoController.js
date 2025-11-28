// controllers/curriculoController.js
import Curriculo from '../models/curriculo.js';
import Usuarios from '../models/usuarios.js';

// --- GET: Mostra o formulário ---
export const showCurriculo = async (req, res) => {
  try {
    const userId = req.session.userId;

    // 1. Busca se já existe um currículo para este usuário
    const curriculo = await Curriculo.findOne({ where: { usuarioId: userId } });
    
    // 2. Busca dados do usuário (para preencher nome/email automaticamente se for novo)
    const user = await Usuarios.findByPk(userId);

    res.render('Curriculo', {
      curriculo: curriculo, // Se for null, o formulário vai vazio
      user: user, // Para pegar o nome/email do cadastro
      userName: req.session.userName
    });

  } catch (error) {
    console.error('Erro ao abrir currículo:', error);
    res.redirect('/home');
  }
};

// --- POST: Salva os dados ---
export const saveCurriculo = async (req, res) => {
  try {
    const userId = req.session.userId;
    
    // Pega TUDO que veio do formulário
    const dadosFormulario = {
      usuarioId: userId,
      nome: req.body.nome,
      cpf: req.body.cpf,
      email: req.body.email,
      telefone: req.body.telefone,
      cidade: req.body.cidade,
      linkedin: req.body.linkedin,
      status: req.body.status, // Radio button
      resumo: req.body.resumo,
      curso: req.body.curso,
      faculdade: req.body.faculdade,
      statusCurso: req.body['status-curso'], // O nome no HTML tem hífen
      cargo: req.body.cargo,
      empresa: req.body.empresa,
      tempoExperiencia: req.body['tempo-empresa'], // O nome no HTML tem hífen
      habilidades: req.body.habilidades // O input hidden (JSON String)
    };

    // Verifica se já existe
    const curriculoExistente = await Curriculo.findOne({ where: { usuarioId: userId } });

    if (curriculoExistente) {
      // ATUALIZA
      await curriculoExistente.update(dadosFormulario);
      console.log("Currículo atualizado!");
    } else {
      // CRIA NOVO
      await Curriculo.create(dadosFormulario);
      console.log("Currículo criado!");
    }

    // Redireciona para o Perfil (onde ele verá o resumo)
    res.redirect('/perfil');

  } catch (error) {
    console.error('Erro ao salvar currículo:', error);
    // Se der erro, volta pro formulário (ideal seria passar o erro pro usuário)
    res.redirect('/curriculo');
  }
};