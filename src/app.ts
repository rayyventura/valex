import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
