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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { modulo } = req.query;
            const connStr = "DefaultEndpointsProtocol=https;AccountName=armazenamentotis;AccountKey=izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==;EndpointSuffix=core.windows.net";
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select * from provas where modulo_id = '${modulo}'`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length == 0) {
                return res.status(200).send("Sem Prova!!");
            }
            const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
            const containerClient = blobServiceClient.GetContainerReference("demo");
            // Get the containerClient before you run these snippets,
            // Can be obtained from `blobServiceClient.getContainerClient("<your-container-name>");`
            let i = 1;
            try {
                for (var _b = __asyncValues(containerClient.listBlobsFlat()), _c; _c = yield _b.next(), !_c.done;) {
                    const blob = _c.value;
                    console.log(`Blob ${i++}: ${blob.name}`);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return res.status(200).send("teste");
        });
    }
}
exports.default = new Provas();
