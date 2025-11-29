import express from 'express';
import path from 'path'; 
import pagesRoutes from './routes/pagesRoutes.js';
import session from 'express-session';
import FileStore from 'session-file-store';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;
const app = express();

// Tipagem correta para as opções (opcional, mas bom)
const fileStoreOptions = {
    retries: 5,             
    minTimeout: 100,        
    maxTimeout: 200,
    logFn: function() {}
};

// AQUI ESTÁ A MUDANÇA: Removemos o 'as any'
// O TS agora sabe que AppFileStore é uma classe válida
const AppFileStore = FileStore(session); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    // AQUI TAMBÉM: Removemos qualquer 'as any'
    store: new AppFileStore(fileStoreOptions),
    secret: process.env.SESSION_SECRET || 'segredo_padrao_inseguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use('/', pagesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});