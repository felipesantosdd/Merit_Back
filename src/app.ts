import express, { Application } from "express"
import cors from "cors"
import { userRoutes } from "./routes/user.Routes"
import inscriptionRoutes from "./routes/inscriptions.Routes"
import messageRoutes from "./routes/message.Routes"
import askRoutes from "./routes/ask.Routes"
import { warningRoutes } from "./routes/warning.Routes"
import linkRoutes from "./routes/link.Routes"
const bodyParser = require('body-parser');

const app: Application = express()

app.use(express.json({ limit: '50mb' }));

app.use(cors())

app.use("/users", userRoutes)
app.use("/inscriptions", inscriptionRoutes)
app.use("/message", messageRoutes)
app.use("/links", linkRoutes)
app.use("/asks", askRoutes)
app.use("/warnings", warningRoutes).use(bodyParser.json({ limit: '10mb' }))

export default app
