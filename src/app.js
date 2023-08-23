//configurar la app en express
import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from "./routes/auth.routes";
import usuarioRoutes from "./routes/usuario.routes";
import cors from "cors";

import { crearRoles } from "./libs/configuracionesIniciales";


const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}));

crearRoles();
app.set('pkg',pkg)

// Habilitar CORS


//Me da el tipo de peticion que me dan a mi ruta
app.use(morgan('dev'))
app.use(express.json());

app.get('/',(req,res)=>{

    res.json({

        mensaje:'Bienvenido',
        autor:app.get('pkg').author,
        version:app.get('pkg').version
    })
})

app.use('/API/products',productsRoutes)
app.use('/API/auth',authRoutes)
app.use('/API/usuarios',usuarioRoutes)

export default app;

