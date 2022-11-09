import { Request, Response } from "express";
class Provas {

    public async cadastrarAcesso(req: any, res: Response): Promise<Response> {
        console.log(req.body);
        return res.status(200).send("Acesso adicionado para usuário");
    }

}

export default new Provas();
