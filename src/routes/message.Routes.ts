import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import MessageController from "../controllers/message.Controller";

const messageRoutes = Router()

messageRoutes.get('/', isAuthenticated, MessageController.getAll)
messageRoutes.post('/', isAuthenticated, MessageController.create)
messageRoutes.delete('/:id', isAuthenticated, MessageController.delete)

export default messageRoutes
