"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
class UsuarioController {
    cadastrarModulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome } = req.body;
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select * from modulo where nome = '${nome}'`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length > 0) {
                return res.status(404).send("Já existe o módulo !");
            }
            yield retorno.query(`insert into modulo values ('${nome}')`);
            return res.status(200).send("Módulo Adicionado");
        });
    }
    getModulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let retorno = yield config_1.default.database();
            let retornoModulos = yield retorno.query(`select * from modulo`);
            let resultadoModulos = yield retornoModulos.recordset;
            return res.status(200).send(resultadoModulos);
        });
    }
    getModulosEspecificos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            let retorno = yield config_1.default.database();
            let retornoModulos = yield retorno.query(`
        select 
        * 
        from 
        acessomodulo a 
        inner join modulo m on m.modulo_id = a.modulo_id 
        inner join usuario u on u.usu_id = a.usu_id
        where u.usu_id = ${id}`);
            let resultadoModulos = yield retornoModulos.recordset;
            return res.status(200).send(resultadoModulos);
        });
    }
}
exports.default = new UsuarioController();
