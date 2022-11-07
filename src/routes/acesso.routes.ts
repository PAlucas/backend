import { Router } from 'express';
import AcessoController from '../controllers/acessomodulo.controller';

const router = Router();

// router.get('/', ModuloController.getModulo);
// router.post('/', AcessoController.getModulosCadastrados);
router.post('/Cadastrar', AcessoController.cadastrarAcesso);

export default router;