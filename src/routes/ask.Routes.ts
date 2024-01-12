import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import AskController from "../controllers/ask.Controller";

const askRoutes = Router()

askRoutes.get('/', isAuthenticated, AskController.getAll)
askRoutes.post('/', isAuthenticated, AskController.create)
askRoutes.delete('/:id', isAuthenticated, AskController.delete)

export default askRoutes
