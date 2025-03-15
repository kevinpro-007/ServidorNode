import { Request, Response } from 'express'
import { Rol } from '../models/rol';

export const ReadRol = async (req: Request, res: Response) => {
    const listRole = await Rol.findAll();
    res.json(listRole);
}


export const ReadRolId = async (req: Request, res: Response) => {
    const { codr } = req.params;
    try {
        const role = await Rol.findOne({ where: { codr: codr } });

        if (!role) {
            return res.status(404).json({
                msg: `Rol con ID ${codr} no encontrada`
            });
        }    
        return res.json({
            msg: `Rol con ID ${codr} encontrada exitosamente`,
            data: role
        });
        
    } catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Rol con ID ${codr}`
        });
    }
}

export const CreateRol = async (req: Request, res: Response) => {

    const { nombre_rol } = req.body

    const role: any = await Rol.findOne({ where: { nombre_rol: nombre_rol } })

    if (role) {
        return res.status(400).json({
            msg: `Rol ${nombre_rol}, ya existe`
        })
    }
    try {
        Rol.create({
            nombre_rol: nombre_rol,
            estado: 1
        })
        return res.json({
            msg: `Rol ${nombre_rol}, creada exitosamente`
        })
    } catch (error) {
        return res.json({
            msg: `Error al crear la Rol ${nombre_rol}`
        })
    }

}

export const UpdateRol = async (req: Request, res: Response) => {

    const { codr } = req.params;
    const { nombre_rol, estado } = req.body;

    try {
        const role: any = await Rol.findOne({ where: { codr: codr } });

        if (!role) {
            return res.status(404).json({
                msg: `Rol ${nombre_rol} no encontrada`
            });
        }

        await Rol.update(
            {
                nombre_rol: nombre_rol,
                estado: estado
            },
            { where: { codr: codr } }
        );

        return res.json({
            msg: `Rol ${nombre_rol} actualizada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la Rol ${nombre_rol}`
        });
    }
};

export const DeleteRol = async (req: Request, res: Response) => {

    const { codr } = req.params;
    try {
        const role: any = await Rol.findOne({ where: { codr: codr } });

        if (!role) {
            return res.status(404).json({
                msg: `Rol con ID ${codr} no encontrada`
            });
        }

        await Rol.destroy({ where: { codr: codr } });

        return res.json({
            msg: `Rol con ID ${codr} eliminada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la Rol con ID ${codr}`
        });
    }
};

