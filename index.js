import express from "express";
import dotnev from "dotenv";
import schoolRouter from "./routes/school.routes.js";
dotnev.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(schoolRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
