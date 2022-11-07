import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller';

const router = Router();

router.get('/', usuarioController.getAprendiz);
router.post('/', usuarioController.getUsuario);
router.post('/Cadastrar', usuarioController.cadastrarUsuario);

export default router;