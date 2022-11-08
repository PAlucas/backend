import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {

    public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        const usuario = await req.params.cliente;
        req.body.usuario_id = usuario;
        return next();  
    }
}

export default new AuthMiddleware();