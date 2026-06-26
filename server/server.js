import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import taskRoutes from "./routes/taskRoutes.js";
import {
  notFound,
  errorHandler
} from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


app.use(
  cors({
    origin:
      process.env.CLIENT_ORIGIN ||
      "http://localhost:5173",

    methods:[
      "GET",
      "POST",
      "PATCH",
      "DELETE"
    ],

    credentials:true
  })
);


// Health check

app.get("/api/health",(req,res)=>{

  res.json({
    status:"ok",
    message:"Task API running"
  });

});


// Routes
app.use(
"/api/auth",
authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);


// Errors

app.use(notFound);

app.use(errorHandler);



// Database + Server


mongoose
.connect(process.env.MONGO_URI)
.then(()=>{

  console.log("✅ MongoDB connected");

  app.listen(PORT,()=>{

    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );

  });

})
.catch((error)=>{

  console.log(
    "❌ MongoDB error:",
    error.message
  );

});