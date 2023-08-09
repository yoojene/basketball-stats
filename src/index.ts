import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send(
    "<h1>🏀 Basketball Stats is alive! 🏀</h1><a href='https://github.com/yoojene/basketball-stats' target='_blank'>Docs</a>"
  );
});

app.use("/players", require("./routes/api/players"));
app.use("/teams", require("./routes/api/teams"));

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
