//CRUD Productos
import { Router } from 'express';
import * as controladorProductos from '../controllers/products.controller'
import {validarJWT} from "../middlewares";
const router = Router();

router.get('/',controladorProductos.obtenerProductos)

router.post('/',   [validarJWT.verificarToken , validarJWT.jwtAdmin]   ,controladorProductos.createProduct)

router.get('/:idProducto',controladorProductos.obtenerProductoPorId)
router.put('/:idProducto', [validarJWT.verificarToken , validarJWT.jwtAdmin],controladorProductos.actualizarProductoPorId)
router.delete('/:idProducto', [validarJWT.verificarToken , validarJWT.jwtAdmin],controladorProductos.eliminarProductoPorId)





export default router;