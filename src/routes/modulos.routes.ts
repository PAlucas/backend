import { Router } from 'express';
import ModuloController from '../controllers/modulos.controller';

const router = Router();

router.get('/', ModuloController.getModulo);
router.post('/', ModuloController.getModulosEspecificos);
router.post('/Cadastrar', ModuloController.cadastrarModulo);

export default router;