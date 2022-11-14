import { ContainerClient } from "@azure/storage-blob";
import { Request, Response } from "express";
import config from '../config';
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const {  StorageSharedKeyCredential } = require("@azure/storage-blob");


class Provas {

    public async cadastrarProva(req: any, res: Response): Promise<Response> {
        const {modulo} =  req.body;
        const file = req.file;
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from provas where modulo_id = '${modulo}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length > 0){
            return res.status(201).send("Já existe prova para módulo !");
        }
        await retorno.query(`insert into provas values ('${modulo}', '${file.originalname}')`);
        return res.status(200).send("Prova Adicionada");
    }

    public async retornaProva(req: any, res: Response): Promise<Response> {
        const {modulo} = req.query;
        const connStr = "DefaultEndpointsProtocol=https;AccountName=armazenamentotis;AccountKey=izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==;EndpointSuffix=core.windows.net";

        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from provas where modulo_id = '${modulo}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length == 0){
            return res.status(404).send("Sem Prova!!");
        }
        const account = "armazenamentotis";
        const accountKey = "izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==";
        
        // Use StorageSharedKeyCredential with storage account and account key
        // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
        const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
        const blobServiceClient = new BlobServiceClient(
          `https://${account}.blob.core.windows.net`,
          sharedKeyCredential
        );
        let containerItem = await blobServiceClient.getContainerClient("demo");
        let blobs = await containerItem.getBlobClient(resultadoExisteModulos[0].arquivo);
        let arquivo =  {
            nome: resultadoExisteModulos[0].arquivo,
            arquivo: blobs
        }
        return res.status(200).send(arquivo);
    }

}

export default new Provas();
