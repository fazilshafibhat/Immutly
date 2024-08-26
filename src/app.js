import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import errorHandler from "./middlewares/error-handler.middleware.js";
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)

app.use(errorHandler)
export { app }
