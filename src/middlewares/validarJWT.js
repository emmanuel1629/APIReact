import jwt from "jsonwebtoken";
import config from "../config";
import objUsuario from "../models/Usuario";
import objRol from "../models/Rol";


export const verificarToken = async(req,res,next)=>
{
    console.log(req.headers)
    try {
        
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({mensaje:"No existe el token"})
        const tokenInfo = jwt.verify(token,config.SECRET)
        req.userId = tokenInfo.id;

        const usuario = await objUsuario.findById( req.userId,{password:0})
        if(!usuario) return res.status(403).json({mensaje:"No existe el usuario"})

        next();
    } catch (error) {
        return res.status(401).json({mensaje:"No Autorizado"})
    }
};

export const jwtAdmin = async (req,res,next)=>{

 const rolUsusario = await objUsuario.findById(req.userId);

 const arregloRoles = await objRol.find({_id:{$in : rolUsusario.roles}})

    for (let i = 0; i < arregloRoles.length; i++) {
    
        if(arregloRoles[i].nombreRol === "administrador")
        {
                
            next(); 
            return
        }
            

    }
    return res.status(403).json({mensaje:"Se requiere rol administrador "})


}

export const jwtModerador = async (req,res,next)=>
{
    

}

