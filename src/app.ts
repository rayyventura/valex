import express, { json } from "express";
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

const app = express();

app.use(json());
app.use(cors());
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
