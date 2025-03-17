import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/usuarios'
import jwt from 'jsonwebtoken'
import { Rol } from '../models/rol'
import { Json } from 'sequelize/types/utils'


export const ReadUser = async (req: Request, res: Response) => {
    const listUser = await User.findAll();
    res.json({
        msg: `List de categoría encontrada exitosamente`,
        data: listUser
    });
}
export const datosUsuario = async (req: Request, res: Response) => {
    const {email}=req.query;
    //console.log("email llegando a la base de datos"+ email);
    
    const datosPersonales = await User.findOne({ where: { email: email } })
    const codr = datosPersonales?.dataValues.codr;
    const rol = await Rol.findOne({ where: { codr: codr } })

    const nombreU = datosPersonales?.dataValues.nombre;
    const apellido = datosPersonales?.dataValues.apellido;
    const nombrerol = rol?.dataValues.nombre_rol;

   const data = {nombreU,apellido,nombrerol}
    /*
    const data= await Rol.findOne({ 
        
       attributes:['codr','nombre_rol'],
       where: { codr: codr }  ,
       include: {
            model:User,
          //as: 'users_rol',
           attributes:['ci','nombre','apellido'],
            where: { email: email }  ,
        },
    })
    */
    res.json({       
         data:data
    });
}
export const CreateUser = async (req: Request, res: Response) => {
    const { ci, nombre, apellido, email, password, establecimiento_id, codr } = req.body
  
    const userci = await User.findOne({ where: { ci: ci } })
    
    const userEmail = await User.findOne({ where: { email: email } })
//validacion en la base de datos con ci, email
    if (userci) {
        return res.status(400).json({
            msg: `Usuario ya existe con la Cedula de Identidad: ${ci}`
        })
    }
    if (userEmail) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email: ${email}`
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    User.create({
        ci: ci,
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        email: email,
        password: passwordHash,
        establecimiento_id: establecimiento_id,
        codr : codr,
        estado: 1,
    })
    res.json({
        msg: `Usuario ${nombre} ${apellido} fue creado.`
    })
    
}


export const LoginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log(req.body);

    const user: any = await User.findOne({ where: { email: email } })
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${email}`
        })
    }


    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecto => ${password}`
        })
    }

    const token = jwt.sign({
        email: email
    }, process.env.SECRET_KEY || 'TSE-Edaniel-Valencia',
    // { expiresIn: '20000' }
    );
    res.json({ token })
}
