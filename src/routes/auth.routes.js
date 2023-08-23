//Autenticacion
import { Router } from 'express';
import * as authController from "../controllers/auth.controller";
import { verificarDatosIngreso }from "../middlewares";

const router = Router();

router.post('/signup',[verificarDatosIngreso.validarDatosRepetidos , verificarDatosIngreso.validarExistenciaDeRoles],authController.signUp)
router.post('/signin',authController.signIn)

export default router;