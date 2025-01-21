import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./db/dbConnect.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";


const app = express();
dotenv.config();


const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Include cookies or authorization headers
  })
);
app.use(cookieParser());
 
app.use("/api/v1/user", userRouter);
 app.use("/api/v1/chat", chatRouter);


dbConnection();


app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
});
