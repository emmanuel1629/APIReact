//Creamos los esquemas de cada usuario
import { Schema , model } from "mongoose";
import bcrypt from "bcryptjs";

const schemaUsuario = Schema({

    usuario:{
       type: String,
        unique:true,
        required:true,
        trim:true


    },

    email:{
        type:String,
        unique:true,
        required:true,
        trim:true


    },

    password:{
        type:String,
        required:true,
    },

     //Coleccion de roles
    roles:[
        //Relacionamos el modelo rol a el schema Usuario
        //El rol depende de el id que mongoose le de a el Schema Rol
        //Por cada rol creado , relacionamos el id con el usuario.
        { ref:"Rol", type:Schema.Types.ObjectId }

    ]

},{
    timestamps:true,
    versionKey:false
}
)


//Metodo para cifrar la contraseña a la hora de crear el usuario
schemaUsuario.statics.encryptPassword = async (password)=>{

    //Modulo salt de la libreria bcrypt que me toma como argumento la cantidad de veces qye vamos a cifrar
    const salt = await bcrypt.genSalt(10)

    //Modulo hash de la libreria bcrypt que toma dos argmentos la cadena de texto y el numero de veces que se cifrara
    return await bcrypt.hash(password,salt) //Me retorna una contraseña cifrada 10 veces sobre la cadena de texto
}

//Metodo para validar contraseña
schemaUsuario.statics.decryptPassword = async (passwordGuardada,passwordRecivida)=>{

   return await bcrypt.compare(passwordGuardada,passwordRecivida) // retorna true si son verdaderas y false si no coinciden

}


export default model('Usuario',schemaUsuario)