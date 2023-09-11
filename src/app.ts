import express, { Application, urlencoded } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";



const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));





//route
app.use("/api/v1", router);
app.use(globalErrorHandler);

export default app;