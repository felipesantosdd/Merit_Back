import UserController from "../controllers/user.Controller"
import { Router } from "express"
import isAuthenticated from "../middlewares/isAuthenticated"
import multer from 'multer';
import multerConfig from '../config/multer';

export const userRoutes = Router()

const upload = multer(multerConfig);

userRoutes.get("/", isAuthenticated, UserController.getAll)
userRoutes.post("/register", UserController.create)
userRoutes.get("/:id", isAuthenticated, UserController.getById)
userRoutes.post("/login", UserController.login)
userRoutes.patch("/update/:id", isAuthenticated, UserController.updateUser)
userRoutes.patch("/update/image/:id", isAuthenticated, upload.single('file'), UserController.uploadImage)
userRoutes.patch("/update/print/:id", isAuthenticated, upload.single('file'), UserController.uploadPrint)
userRoutes.patch("/update/documentFront/:id", isAuthenticated, upload.single('file'), UserController.uploadDocumentFront)
userRoutes.patch("/update/documentBack/:id", isAuthenticated, upload.single('file'), UserController.uploadDocumentBack)
