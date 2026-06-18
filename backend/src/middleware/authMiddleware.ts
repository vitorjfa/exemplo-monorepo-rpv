import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    userId?: number
}

const CHAVE_SECRETA = 'chave_secreta'

export const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    // .o token virá no header da requisição
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({ auth: false, message: "Acesso negado. Token não fornecido"})
    }

    jwt.verify(
        token,
        CHAVE_SECRETA,
        (err, decoded) => {
            if(err){
                return res.status(403).json({ auth: false, message: "Token inválido ou expirado."})
            }

            if(decoded){
                req.userId = (decoded as jwt.JwtPayload).id;
            }

            next();
        }
    );
}