import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.configDotenv({
  path: ".env",
});

const app = express();

app.use(cookieParser());


app.use(cors({
  origin: ['http://localhost:5173'], 
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// //routes
 import authRouter from "./routes/auth.routes.js";
 import employeeRouter from "./routes/employee.routes.js";


// //routes declaration
app.get('/employee', (req, res) => {
  res.send('Hi, World! Welcome to Employee Management');
 
});
app.use("/auth", authRouter);
app.use("/employee", employeeRouter);


export { app };
