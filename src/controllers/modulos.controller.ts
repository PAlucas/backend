import { Request, Response } from "express";
import config from '../config';

class UsuarioController {

    public async cadastrarModulo(req: Request, res: Response): Promise<Response> {
        const {nome} =  req.body;
        
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from modulo where nome = '${nome}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length > 0){
            return res.status(404).send("Já existe o módulo !");
        }
        await retorno.query(`insert into modulo values ('${nome}')`);
        return res.status(200).send("Módulo Adicionado");
    }

    public async getModulo(req: Request, res: Response): Promise<Response> {
        let retorno = await config.database();
        let retornoModulos = await retorno.query(`select * from modulo`);
        let resultadoModulos = await retornoModulos.recordset;
        return res.status(200).send(resultadoModulos);
    }  

    public async getModulosEspecificos(req: Request, res: Response): Promise<Response> {
        const {id} =  req.body;
        let retorno = await config.database();
        let retornoModulos = await retorno.query(`
        select 
        * 
        from 
        acessomodulo a 
        inner join modulo m on m.modulo_id = a.modulo_id 
        inner join usuario u on u.usu_id = a.usu_id
        where u.usu_id = ${id}`);
        let resultadoModulos = await retornoModulos.recordset;
        return res.status(200).send(resultadoModulos);
    }  
}

export default new UsuarioController();