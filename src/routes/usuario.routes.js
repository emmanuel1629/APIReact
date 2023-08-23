//CRUD Usuarios
import { Router } from 'express';
const router = Router();
import * as controladorUsuarios from "../controllers/usuarios.controller";

router.post('/',controladorUsuarios.crearUsuario);
router.get('/',controladorUsuarios.obtenerUsuarios);

router.get('/:usuario_id',controladorUsuarios.obtenerUsuarioPorId);
router.put('/:usuario_id',controladorUsuarios.actualizarUsuarioPorId);

export default router;