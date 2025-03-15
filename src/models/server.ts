import express, { Application } from 'express'
import routesCategoty from '../routes/category'
import routesProduct from '../routes/product'
import routesRol from '../routes/rol'
import routesUsuarios from '../routes/user'
import routesEstablecimiento from '../routes/establecimiento'
import routesMenu from '../routes/menu'
import routesRolmen from '../routes/menu'
import { Category } from './category'
import { Product } from './product'
import { Rol } from './rol'
import { User } from './usuarios'
import cors from 'cors'
import { Establecimiento } from './establecimiento'
import { Rolmen } from './rolmen'
import { Menu } from './menu'

class Server {

    private app: Application
    private port: string


    constructor() {
        this.app = express()
        this.port = process.env.PORT || '3017'
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnetc();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("La aplicación se esta corriendo exitosamente en el puerto => " + this.port)
        })
    }

    router() {
        this.app.use(routesEstablecimiento);
        //this.app.use(routesProduct);
        this.app.use(routesRol);
        this.app.use(routesMenu);
        this.app.use(routesRolmen);
        this.app.use(routesUsuarios);
    }

    midlewares() {
        //Parseo BOdy
        this.app.use(express.json()
    )

        this.app.use(cors())
    }

    async DBconnetc() {
        try {

             //await Product.sync({force: true}); // Clean date of table
            //await Establecimiento.sync(); 
           // await Rolmen.sync(); 
           // await Rol.sync(); 
            //await Menu.sync(); 
            //await User.sync(); 
            console.log("Conexion de DB exitoso");

        } catch (error) {
            console.log("Conexion de DB errorena => " + error);

        }
    }
}


export default Server