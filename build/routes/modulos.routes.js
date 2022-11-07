"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modulos_controller_1 = __importDefault(require("../controllers/modulos.controller"));
const router = (0, express_1.Router)();
router.get('/', modulos_controller_1.default.getModulo);
router.post('/', modulos_controller_1.default.getModulosEspecificos);
router.post('/Cadastrar', modulos_controller_1.default.cadastrarModulo);
exports.default = router;
