import express from "express"
import ErrorMiddleware from "./middlewares/ErrorMiddleware"
import router from "./routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50kb" }))

app.use("/", router)

app.use(ErrorMiddleware.error404Middleware)
app.use(ErrorMiddleware.handleErrorMiddleware)

export { app }