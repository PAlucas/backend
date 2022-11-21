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
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const { StorageSharedKeyCredential } = require("@azure/storage-blob");
class Provas {
    cadastrarProva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modulo } = req.body;
            const file = req.file;
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select * from provas where modulo_id = '${modulo}'`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length > 0) {
                return res.status(201).send("Já existe prova para módulo !");
            }
            yield retorno.query(`insert into provas values ('${modulo}', '${file.originalname}')`);
            return res.status(200).send("Prova Adicionada");
        });
    }
    retornaProva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modulo } = req.query;
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select * from provas where modulo_id = '${modulo}'`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length == 0) {
                return res.status(404).send("Sem Prova!!");
            }
            const account = "armazenamentotis";
            const accountKey = "izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==";
            const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
            const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);
            let containerItem = yield blobServiceClient.getContainerClient("demo");
            let blobs = yield containerItem.getBlobClient(resultadoExisteModulos[0].arquivo);
            let arquivo = {
                nome: resultadoExisteModulos[0].arquivo,
                id: resultadoExisteModulos[0].prova_id,
                arquivo: blobs
            };
            return res.status(200).send(arquivo);
        });
    }
    cadastrarProvaFeita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuId, provaId } = req.body;
            const file = req.file;
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select * from notaprova where prova_id = '${provaId}' and usu_id = ${usuId}`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length > 0) {
                return res.status(201).send("Já foi enviada a prova");
            }
            if (file == undefined) {
                return res.status(404).send("Sem arquivo");
            }
            yield retorno.query(`insert into notaprova (usu_id, prova_id, arquivo) values (${usuId}, ${provaId},'${file.originalname}')`);
            return res.status(200).send("Prova Adicionada");
        });
    }
    provasFeitas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuId } = req.body;
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select m.nome, np.arquivo, np.nota from 
                                                provas p
                                                    inner join modulo m on p.modulo_id = m.modulo_id
                                                    inner join notaprova np on p.prova_id = np.prova_id
                                                where usu_id = ${usuId}`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length == 0) {
                return res.status(404).send("Sem provas feitas");
            }
            const account = "armazenamentotis";
            const accountKey = "izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==";
            const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
            const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);
            let containerItem = yield blobServiceClient.getContainerClient("demo");
            let final = [];
            resultadoExisteModulos.forEach((element, index) => {
                let blobs = containerItem.getBlobClient(resultadoExisteModulos[index].arquivo);
                let arquivo = {
                    modulo: resultadoExisteModulos[index].nome,
                    nota: resultadoExisteModulos[index].nota,
                    arquivo: blobs
                };
                final.push(arquivo);
            });
            return res.status(200).send(final);
        });
    }
}
exports.default = new Provas();
