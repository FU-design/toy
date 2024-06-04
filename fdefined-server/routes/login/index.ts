import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import * as jwt from "jsonwebtoken";

const secretKey = "keyof_Fdefined_1024";
const router = Router();

// 模拟账号
const chatAccounts = [
  {
    authCode: "code_tom",
    name: "Tom",
    pwsd: "1940",
  },
  {
    authCode: "code_jerry",
    name: "Jerry",
    pwsd: "1940",
  },
  {
    authCode: "code_fdefined",
    name: "Fdefined",
    pwsd: "1024",
  },
];

interface AccountInfo {
  chatName: string;
  chatPassword: string;
}

const checkAccount = ({ chatName: name, chatPassword: pwsd }: AccountInfo) => {
  return chatAccounts.filter((acc) => acc.name == name && acc.pwsd == pwsd);
};

// 定义路由---登录
router.post("/login", function (req, res) {
  const findRes = checkAccount(req.body);
  if (findRes.length > 0) {
    const token = jwt.sign(findRes[0], secretKey, { expiresIn: "1h" });
    res.json({
      chatCode: findRes[0].authCode,
      token,
      chatName: findRes[0].name,
    });
  } else {
    res.status(401).json({ message: "身份信息错误" });
  }
});

// 中间件函数
// function timeLog(req: Request, res: Response, next: NextFunction) {
//   console.log("Time: ", Date.now());
//   next();
// }

// 中间件：验证 JWT
// function authenticateToken(req: Request, res: Response, next: NextFunction) {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).json({ message: "身份信息已失效" });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "无效token" });
//     }
//     next();
//   });
// }

// // 定义中间件
// router.use(timeLog);

export default router;
