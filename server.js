import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';
import pagesRoutes from './routes/pagesRoutes.js';
import session from 'express-session';
import FileStore from 'session-file-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const app = express();

const fileStoreOptions = {};
const AppFileStore = FileStore(session);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    store: new AppFileStore(fileStoreOptions), // Salva sessões em arquivos
    secret: 'seu_segredo_super_secreto', // MUDE ISSO! É a chave de segurança
    resave: false, // Não salva a sessão se não houver mudança
    saveUninitialized: false, // Não cria sessão para quem não está logado
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 dia de duração do cookie
    }
  })
);

app.use('/', pagesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});