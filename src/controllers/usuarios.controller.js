import objUsuario from "../models/Usuario";
import objRol from "../models/Rol";
import  jwt from "jsonwebtoken";
import config from "../config";


export const crearUsuario = async (req,res)=>
{

    try {
        const { usuario,email,password,roles } = req.body
        console.log(roles)
        const usuarioEncontrado = await objUsuario.findOne({email})
        if(usuarioEncontrado){
            return res.status(400).json({mensaje : ["usuario Existente"]})
        }

        const nuevoUsuario = new objUsuario(
            {
                usuario,
                email,
                password: await objUsuario.encryptPassword(password)
            })
    /*
            Ver el contenido del arreglo roles que viene desde la peticiòn y validar si tiene contenido
            
    
            Verificar si en el arreglo roles de mi db en mongo existe una coleccion llamada roles
            Si existe buscar un rol que concuerde con el rol enviado desde la peticion
            Si el nombre de el rol que viene desde la peticion concuerda con el nombre que tenemos guardado
            Extraemos el id de el rol guardado en la coleccion y se lo asignamos a el atributo roles
    
            Si en la peticion no vienen roles definidos , declaramos un rol por defecto , que es el de usuarios
    */

        if(roles.length === 0)
        {
            const rolPorDefecto =  await objRol.findOne({nombreRol:"aprendiz"})
            console.log("Rol por defecto encontrado:", rolPorDefecto);
            nuevoUsuario.roles = [rolPorDefecto._id];

        }else
        {
            const rolesEncontrados=  await objRol.find({nombreRol:{$in:roles}})
            console.log("Roles encontrados:", rolesEncontrados);
            nuevoUsuario.roles = rolesEncontrados.map(Rol=>Rol._id)
        }
        const usuarioGuardado = await nuevoUsuario.save();
            //JWT Para autenticacion
            /* Tres argumentos
            1:un objeto que me guarda la referencia a la cual le vamos asignar el token
            2:La clave con la que identificaremos el token
            3:un objeto de configuracion del token (duracion)
            */
        const token = jwt.sign({ id: usuarioGuardado._id }, config.SECRET, {
            expiresIn: 86400 // Expresado en segundos
        });
        
            //Cuando guardamos un usuario devolvemos el token de autenticacion 
            
        res.status(200).json({token})
         
    } catch (error) {
        console.log(error)
    }


}

export const obtenerUsuarios = async (req,res)=>
{
    const arregloUsuarios = await objUsuario.find();
    return res.status(201).json(arregloUsuarios)
}

export const obtenerUsuarioPorId = async (req,res)=>
{
    const usuario_id = req.params.usuario_id;
    const usuarioEncontrado = await objUsuario.findOne({_id:usuario_id});

    return res.status(201).json(usuarioEncontrado);
}

export const actualizarUsuarioPorId = async (req,res)=>
{
    const usuario_id = req.params.usuario_id;
    const usuarioActualizado = await objUsuario.findByIdAndUpdate(usuario_id,req.body,{new:true});
    return res.status(200).json(usuarioActualizado);
}