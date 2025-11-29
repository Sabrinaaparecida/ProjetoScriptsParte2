import express from 'express';

import { handleLogin, handleRegister, handleLogout } from '../controllers/authController.js';
import { checkAuth } from '../middleware/auth.js';
import { showCurriculo, saveCurriculo } from '../controllers/curriculoController.js';
import { showPerfil } from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Login');
});

router.get('/cadastro', (req, res) => {
  res.render('Cadastro');
});

router.post('/login', handleLogin);
router.post('/cadastro', handleRegister);
router.get('/logout', handleLogout);

router.get('/home', checkAuth, (req, res) => {
  res.render('PaginaDeHome', {
    userName: req.session.userName // Passa o nome para a View
  });
});

// router.get('/perfil', checkAuth, (req, res) => {
//   const showToast = req.session.showWelcomeToast;
//   delete req.session.showWelcomeToast;
//   res.render('perfil', {
//     userName: req.session.userName,
//     showWelcomeToast: showToast 
//   });
// });

router.get('/perfil', checkAuth, showPerfil);

router.get('/curriculo', checkAuth, showCurriculo);
router.post('/curriculo/salvar', checkAuth, saveCurriculo);

export default router;



