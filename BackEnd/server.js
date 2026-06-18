import express from "express";
import cors from "cors"
import {connectDB} from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import dotenv from "dotenv";

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors())

// DB connect
connectDB()

// API endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))

// test route
app.get("/", (req, res)=>{
  res.send("API working fine")
})
// start server
app.listen(PORT, ()=>console.log(`Server Started on http://localhost:${PORT}`))

