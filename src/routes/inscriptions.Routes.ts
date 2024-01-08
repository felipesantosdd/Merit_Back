import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import InscriptionController from "../controllers/inscription.Controller";

const inscriptionRoutes = Router()

inscriptionRoutes.get('/', isAuthenticated, InscriptionController.getAll)
inscriptionRoutes.post('/', isAuthenticated, InscriptionController.create)
inscriptionRoutes.delete('/:id', isAuthenticated, InscriptionController.delete)

export default inscriptionRoutes
