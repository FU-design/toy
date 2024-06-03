import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import * as jwt from "jsonwebtoken";

const secretKey = "keyof_Fdefined_1024";
const router = Router();

// 模拟账号
const chatInfo = {
  authCode: "code_fdefined",
  name: "Fdefined",
  pwsd: "1024",
};

// 中间件函数
function timeLog(req: Request, res: Response, next: NextFunction) {
  console.log("Time: ", Date.now());
  next();
}

// 中间件：验证 JWT
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "身份信息已失效" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "无效token" });
    }
    next();
  });
}

// 定义中间件
router.use(timeLog);

// 定义路由---登录
router.post("/login", function (req, res) {
  const { chatPassword, chatName } = req.body;
  const { pwsd, name, authCode } = chatInfo;
  if (pwsd === chatPassword && name === chatName) {
    const token = jwt.sign(chatInfo, secretKey, { expiresIn: "1h" });
    res.json({ chatCode: authCode, token, chatName: name });
  } else {
    res.status(401).json({ message: "身份信息错误" });
  }
});

export default router;
