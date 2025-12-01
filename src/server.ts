import express from 'express';
import path from 'path';
import pagesRoutes from './routes/pagesRoutes.js';
import cookieParser from 'cookie-parser'; 
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'dist', 'views'));
app.use(express.static(path.join(__dirname, 'dist', 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use('/', pagesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});