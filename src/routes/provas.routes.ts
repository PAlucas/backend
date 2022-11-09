import { Router } from 'express';
import TutoriaisController from '../controllers/tutoriais.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

// router.get('/', ModuloController.getModulo);
var multer = require('multer')
var upload = multer({dest : './'});
//router.post('/',upload.single("file"), TutoriaisController.cadastrarAcesso);

export default router;