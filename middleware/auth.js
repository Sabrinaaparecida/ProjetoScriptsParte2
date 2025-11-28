// Este middleware verifica se o usuário está logado
export const checkAuth = (req, res, next) => {
  // Se 'userId' existir na sessão, o usuário está logado
  if (req.session.userId) {
    next(); // Permite que ele continue para a rota
  } else {
    // Se não, redireciona para o login
    res.redirect('/');
  }
};