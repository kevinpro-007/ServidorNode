import { Request, Response } from 'express'
import { Establecimiento } from '../models/establecimiento'

export const ReadEstablecimiento = async (req: Request, res: Response) => {
    const listEstablecimiento = await Establecimiento.findAll();
   //console.log(listEstablecimiento);
    
    res.json(listEstablecimiento);
    // res.json({
      //  msg: `List de categoría encontrada exitosamente`,
       // data: listEstablecimiento
   //});
}

export const ReadEstablecimientoId = async (req: Request, res: Response) => {
    const { id_establecimiento } = req.params;
    try {
        const establecimiento = await Establecimiento.findOne({ where: { id_establecimiento: id_establecimiento } });

        if (!establecimiento) {
            return res.status(404).json({
                msg: `Establecimiento con ID ${id_establecimiento} no encontrada`
            });
        }    
        return res.json({
            msg: `Establecimiento con ID ${id_establecimiento} encontrada exitosamente`,
            data: establecimiento
        });
        
    } catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Establecimiento con ID ${id_establecimiento}`
        });
    }
}

export const CreateEstablecimiento = async (req: Request, res: Response) => {

    const { nombre_establecimiento } = req.body

    const establecimiento: any = await Establecimiento.findOne({ where: { nombre_establecimiento: nombre_establecimiento } })

    if (establecimiento) {
        return res.status(400).json({
            msg: `Establecimiento: ${nombre_establecimiento}, ya existe`
        })
    }
    try {
        Establecimiento.create({
            nombre_establecimiento: nombre_establecimiento,           
            estado: 1
        })
        return res.json({
            msg: `Establecimiento: ${nombre_establecimiento}, creada exitosamente`
        })
    } catch (error) {
        return res.json({
            msg: `Error al crear la Establecimiento: ${nombre_establecimiento}`
        })
    }

}


export const UpdateEstablecimiento = async (req: Request, res: Response) => {

    const { id_establecimiento } = req.params;
    const { nombre_establecimiento, estado } = req.body;

    try {
        const establecimiento: any = await Establecimiento.findOne({ where: { id_establecimiento: id_establecimiento } });

        if (!establecimiento) {
            return res.status(404).json({
                msg: `Establecimiento: ${nombre_establecimiento} no encontrada`
            });
        }

        await Establecimiento.update(
            {
                nombre_establecimiento: nombre_establecimiento,
                estado: estado
            },
            { where: { id_establecimiento: id_establecimiento } }
        );

        return res.json({
            msg: `Establecimiento: ${nombre_establecimiento} actualizada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la categoría ${nombre_establecimiento}`
        });
    }
};

export const DeleteEstablecimiento = async (req: Request, res: Response) => {

    const { id_establecimiento } = req.params;
    try {
        const establecimiento: any = await Establecimiento.findOne({ where: { id_establecimiento: id_establecimiento } });

        if (!establecimiento) {
            return res.status(404).json({
                msg: `Establecimiento: con ID ${id_establecimiento} no encontrada`
            });
        }

        await Establecimiento.destroy({ where: { id_establecimiento: id_establecimiento } });

        return res.json({
            msg: `Establecimiento: con ID ${id_establecimiento} eliminada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la categoría con ID ${id_establecimiento}`
        });
    }
};

