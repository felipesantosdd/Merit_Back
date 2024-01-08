import express, { Application } from "express"
import cors from "cors"
import { userRoutes } from "./routes/user.Routes"
import inscriptionRoutes from "./routes/inscriptions.Routes"

const app: Application = express()
app.use(express.json())

app.use(cors())

app.use("/users", userRoutes)
app.use("/inscriptions", inscriptionRoutes)

export default app
