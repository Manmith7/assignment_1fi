import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectDB } from './config/db.js'
import ProductRoutes from './routes/product.routes.js'
import EmiRoutes from './routes/emi.routes.js'
import cors from 'cors';
const app = express()

connectDB()
app.use(express.json())
app.use(cors())

app.use('/api/products',ProductRoutes)
app.use('/api/emi',EmiRoutes)
const PORT = process.env.PORT

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
