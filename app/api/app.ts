import express from "express"
import ErrorMiddleware from "./middlewares/ErrorMiddleware"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50kb" }))

app.use(ErrorMiddleware.error404Middleware)
app.use(ErrorMiddleware.handleErrorMiddleware)

export { app }