import express from 'express';
import usuarioRoutes from './routes/usuario.routes';
import moduloRoutes from './routes/modulos.routes';
import acessoRoutes from './routes/acesso.routes';
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/AcessoModulo', acessoRoutes);
app.use('/Usuario', usuarioRoutes);
app.use('/Modulo', moduloRoutes);
app.get('/', async (req, res) =>{
    return res.status(200).send("Hello World!!");
})
app.listen(3333);