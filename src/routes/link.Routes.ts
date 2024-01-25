import LinkController from "../controllers/link.Controller";
import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";

const linkRoutes = Router()

linkRoutes.get('/', isAuthenticated, LinkController.getAll)
linkRoutes.post('/', isAuthenticated, LinkController.create)
linkRoutes.patch('/:id', isAuthenticated, LinkController.update)

export default linkRoutes
