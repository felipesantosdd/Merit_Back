import { Router } from "express"
import isAuthenticated from "../middlewares/isAuthenticated"
import multer from 'multer';
import multerConfig from '../config/multer';
import WarningController from "../controllers/warning.Controllers";

export const warningRoutes = Router()

const upload = multer(multerConfig);

warningRoutes.get("/find", WarningController.getAll)

warningRoutes.post("/create", isAuthenticated, upload.single('file'), WarningController.create)

warningRoutes.delete("/delete/:id", isAuthenticated, WarningController.delete)
