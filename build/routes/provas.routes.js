"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// router.get('/', ModuloController.getModulo);
var multer = require('multer');
var upload = multer({ dest: './' });
//router.post('/',upload.single("file"), TutoriaisController.cadastrarAcesso);
exports.default = router;
