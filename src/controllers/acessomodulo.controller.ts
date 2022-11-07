import { Request, Response } from "express";
import config from '../config';

class AcessoController {

    public async cadastrarAcesso(req: Request, res: Response): Promise<Response> {
        const {usuId, moduloId} =  req.body;
        let modulos = moduloId.toString().split(",");
        let retorno = await config.database();
        await retorno.query(`delete acessomodulo where usu_id = ${usuId}`);
        modulos.forEach(async (element : string) => {
            await retorno.query(`insert into acessomodulo values ('${usuId}','${element}')`);
        });
        return res.status(200).send("Acesso adicionado para usuário");
    }

}

export default new AcessoController();