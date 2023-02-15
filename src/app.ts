import "express-async-errors";
import express, { Application, json } from "express";
import { handleError } from "./errors";
import usersRoutes from "./routes/users.routes";

const app: Application = express();
app.use(json());

app.use("/users", usersRoutes);

app.use(handleError);

export default app;