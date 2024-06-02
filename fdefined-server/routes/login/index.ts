import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import * as jwt from "jsonwebtoken";

const secretKey = "keyof_Fdefined_1024";
const router = Router();

// 模拟账号
const chatInfo = {
  chatCode: "code_fdefined",
  chatName: "Fdefined",
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
  const { chatCode, chatName } = req.body;
  if (chatCode === chatInfo.chatCode && chatName === chatInfo.chatName) {
    const token = jwt.sign(chatInfo, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "身份信息错误" });
  }
});

export default router;
