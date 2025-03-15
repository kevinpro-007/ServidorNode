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
const express_1 = __importDefault(require("express"));
const rol_1 = __importDefault(require("../routes/rol"));
const user_1 = __importDefault(require("../routes/user"));
const establecimiento_1 = __importDefault(require("../routes/establecimiento"));
const menu_1 = __importDefault(require("../routes/menu"));
const menu_2 = __importDefault(require("../routes/menu"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3017';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnetc();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("La aplicación se esta corriendo exitosamente en el puerto => " + this.port);
        });
    }
    router() {
        this.app.use(establecimiento_1.default);
        //this.app.use(routesProduct);
        this.app.use(rol_1.default);
        this.app.use(menu_1.default);
        this.app.use(menu_2.default);
        this.app.use(user_1.default);
    }
    midlewares() {
        //Parseo BOdy
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    DBconnetc() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //await Product.sync({force: true}); // Clean date of table
                //await Establecimiento.sync(); 
                // await Rolmen.sync(); 
                // await Rol.sync(); 
                //await Menu.sync(); 
                //await User.sync(); 
                console.log("Conexion de DB exitoso");
            }
            catch (error) {
                console.log("Conexion de DB errorena => " + error);
            }
        });
    }
}
exports.default = Server;
