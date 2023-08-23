import {ROLESAlmacenados} from "../models/Rol";
import objUsuario from "../models/Usuario";


export const validarDatosRepetidos = async (req,res,next) =>
{
    const usuario = await objUsuario.findOne({usuario: req.body.usuario})
    if(usuario) return res.status(400).json({mensaje:"usuario existente"})

    const email = await objUsuario.findOne({email: req.body.email})
    if(email) return res.status(400).json({mensaje:"email existente"})

    if (req.body.password.length < 6) {
        return res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres" });
    }

    next();

}

export const validarExistenciaDeRoles = async (req,res,next) =>
{
    if(req.body.roles){

        for (let i = 0; i < req.body.roles.length; i++) {
            
            if(!ROLESAlmacenados.includes(req.body.roles[i]))
            {
                return res.status(400).json({mensaje:`Role ${req.body.roles[i]} no existe `})
            }
        }
    }

    next();

}