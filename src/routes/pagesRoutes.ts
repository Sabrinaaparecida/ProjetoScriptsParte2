import express from 'express';

import { handleLogin, handleRegister, handleLogout } from '../controllers/authController.js';
import { checkAuth } from '../middleware/auth.js';
import { showCurriculo, saveCurriculo } from '../controllers/curriculoController.js';
import { showPerfil } from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
  const sucesso = req.cookies.cadastroSucesso;
  
  if (sucesso) res.clearCookie('cadastroSucesso');

  res.render('Login', { cadastroSucesso: sucesso });
});

router.get('/cadastro', (req, res) => {
  res.render('Cadastro');
});

router.post('/login', handleLogin);
router.post('/cadastro', handleRegister);
router.get('/logout', handleLogout);

router.get('/home', checkAuth, (req, res) => {
  res.render('PaginaDeHome', {
    userName: res.locals.userName 
  });
});

router.get('/perfil', checkAuth, showPerfil);

router.get('/curriculo', checkAuth, showCurriculo);
router.post('/curriculo/salvar', checkAuth, saveCurriculo);

export default router;



