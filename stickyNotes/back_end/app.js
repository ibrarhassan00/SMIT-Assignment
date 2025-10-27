import express from "express";
import dotenv from "dotenv";
import connectMongoDatabase from "./config/db.js";
import userSignupRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config({ path: "./config/config.env" });
connectMongoDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(`/api`,userSignupRoute);











app.listen(PORT , ()=>{console.log(`server is on port ${PORT}`)})