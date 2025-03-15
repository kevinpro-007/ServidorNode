import { Request, Response } from 'express'
import { Menu } from '../models/menu'
import { Rol } from '../models/rol';
import { User } from '../models/usuarios';
import { Rolmen } from '../models/rolmen';

export const ReadMenu = async (req: Request, res: Response) => {
    const listMenu = await Menu.findAll();
    res.json(listMenu);
    // res.json({
    //     msg: `List de menu encontrada exitosamente`,
    //     data: listmenu
    // });
}
export const MenusCodr = async (req: Request, res: Response) => {
    const { email } = req.query;
    console.log("email llegando a la base de datos" + email);
    const datosPersonales = await User.findOne({ where: { email: email } })
    const codr = datosPersonales?.dataValues.codr;

    const data = await Menu.findAll({
        //attributes:['codr','nombre_rol'],           
        include: {
            model: Rolmen,
            as: 'rolmen_codm',
            where: { codr: codr },
        },
    })

    res.json({
        data: data
    });
}

export const ReadMenuId = async (req: Request, res: Response) => {
    const { codm } = req.params;
    try {
        const menu = await Menu.findOne({ where: { codm: codm } });

        if (!menu) {
            return res.status(404).json({
                msg: `Menu con ID ${codm} no encontrada`
            });
        }
        return res.json({
            msg: `Menu con ID ${codm} encontrada exitosamente`,
            data: menu
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Menu con ID ${codm}`
        });
    }
}

export const CreateMenu = async (req: Request, res: Response) => {

    const { nombre_menu, iconos } = req.body

    const menu: any = await Menu.findOne({ where: { nombre_menu: nombre_menu } })

    if (menu) {
        return res.status(400).json({
            msg: `Menu ${nombre_menu}, ya existe`
        })
    }
    try {
        Menu.create({
            nombre_menu: nombre_menu,
            iconos: iconos,
            estado: 1
        })
        return res.json({
            msg: `Menu ${nombre_menu}, creada exitosamente`
        })
    } catch (error) {
        return res.json({
            msg: `Error al crear la Menu ${nombre_menu}`
        })
    }

}


export const UpdateMenu = async (req: Request, res: Response) => {

    const { codm } = req.params;
    const { nombre_menu, iconos, estado } = req.body;

    try {
        const menu: any = await Menu.findOne({ where: { codm: codm } });

        if (!menu) {
            return res.status(404).json({
                msg: `Menu ${nombre_menu} no encontrada`
            });
        }

        await Menu.update(
            {
                nombre_menu: nombre_menu,
                iconos: iconos,
                estado: estado
            },
            { where: { codm: codm } }
        );

        return res.json({
            msg: `Menu ${nombre_menu} actualizada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la Menu ${nombre_menu}`
        });
    }
};

export const DeleteMenu = async (req: Request, res: Response) => {

    const { codm } = req.params;
    try {
        const menu: any = await Menu.findOne({ where: { codm: codm } });

        if (!menu) {
            return res.status(404).json({
                msg: `Menu con ID ${codm} no encontrada`
            });
        }

        await Menu.destroy({ where: { codm: codm } });

        return res.json({
            msg: `Menu con ID ${codm} eliminada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la Menu con ID ${codm}`
        });
    }
};

