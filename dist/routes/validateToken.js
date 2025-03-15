"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    console.log("VALIDATE TOKEN", headerToken);
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const token = headerToken.slice(7);
            //console.log(token);        
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'TSE-Edaniel-Valencia');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: `Se a terminado tu sesión`
            });
        }
    }
    else {
        res.status(401).json({
            msg: `Acceso Denegado`
        });
    }
};
exports.default = validateToken;
