import { Router } from "express"
import isAuthenticated from "../middlewares/isAuthenticated"
import multer from 'multer';
import multerConfig from '../config/multer';
import WarningController from "../controllers/warning.Controllers";

export const warningrRoutes = Router()

const upload = multer(multerConfig);

warningrRoutes.get("/find", WarningController.create)

warningrRoutes.post("/create", isAuthenticated, upload.single('file'), WarningController.getAll)

warningrRoutes.delete("/delete/:id", isAuthenticated, WarningController.delete)
