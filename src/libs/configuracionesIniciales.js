//Configuraciones que se ejecutan cuando mi servidor se inicia
//Por lo tanto instanciamos la funcion en el archivo que inicia nuestro servidor   

//importamos squema roles 

import Roles from "../models/Rol";

export const crearRoles = async () => {
    try {
        
        //validamos que existan datos en el squema
        const cantidadRoles = await Roles.estimatedDocumentCount();

        if (cantidadRoles > 0) return;//Si existen datos retornamos la funcion y finalizamos la ejecucion

        /* si no existen datos creamos 3 objetos del squema roles
        con los roles que requiramos se creen cuando el servidor inicia
        */

        const rolesAlmacenados = await Promise.all([

                new Roles({nombreRol:"aprendiz"}).save(),

                new Roles({nombreRol:"administrador"}).save(),

                new Roles({nombreRol:"profesor"}).save()

            ]);

        //retornamos el arreglo de roles creados 
        console.log(rolesAlmacenados)

    } catch (error) {
        console.log(error);
    }

};