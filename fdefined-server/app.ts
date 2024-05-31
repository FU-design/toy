import express, { type Express } from "express";
import routes from "./routes/index";
const port = 3000;
const app: Express = express();
app.use(express.json());

[...routes.entries()].forEach(([name, route]) => app.use(name, route));

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// import path from "path";
/**
 * 在 Express 中提供静态文件
 * express.static(root, [options])
 * 该root参数指定提供静态资产的根目录
 */
// // 下面写法使用绝对路径更为准确
// app.use("/static", express.static(path.join(__dirname, "public")));
// app.use(express.static("files"));

// // app.METHOD(PATH, HANDLER)
// app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// import * as jwt from "jsonwebtoken";
// const secretKey = "keyof_Fdefined_1024";
