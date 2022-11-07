import { Router } from 'express';
import AcessoController from '../controllers/acessomodulo.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

// router.get('/', ModuloController.getModulo);
// router.post('/', AcessoController.getModulosCadastrados);
router.post('/Cadastrar',authMiddleware.autorizarUsuarioByParams, AcessoController.cadastrarAcesso);

export default router;