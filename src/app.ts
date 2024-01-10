import express, { Application } from "express"
import cors from "cors"
import { userRoutes } from "./routes/user.Routes"
import inscriptionRoutes from "./routes/inscriptions.Routes"
import messageRoutes from "./routes/todo.Routes"

const app: Application = express()
app.use(express.json())

app.use(cors())

app.use("/users", userRoutes)
app.use("/inscriptions", inscriptionRoutes)
app.use("/message", messageRoutes)

export default app
