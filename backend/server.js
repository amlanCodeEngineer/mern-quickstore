import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config();
 const PORT = process.env.PORT || 4000;

 const __dirname = path.resolve(); //get the current directory path

const app = express();
app.use(express.json()); //middleware that allows us to parse JSON data from the request body

app.use("/api/products",productRoutes)//access the product routes from the server

// console.log(process.env.MONGO_URI);
if(process.env.NODE_ENV=== "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.get("/", (req,res)=>{
  res.send("The server is ready!");
})
app.listen(PORT, ()=>{
  connectDB();
  console.log("server started at http://localhost:" + PORT);
})

