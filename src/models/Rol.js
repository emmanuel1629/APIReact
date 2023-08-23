//Creamos los esquemas de cada usuario
import { Schema , model } from "mongoose";

export const ROLESAlmacenados = ["usuario","administrador","profesor"] 
const schemaRol = Schema({
    nombreRol:String
},{
  
    versionKey:false
}

)

export default model('Rol',schemaRol)