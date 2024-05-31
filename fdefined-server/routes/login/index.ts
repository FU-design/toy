import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

const router = Router();

// 中间件函数
function timeLog(req: Request, res: Response, next: NextFunction) {
  console.log("Time: ", Date.now());
  next();
}

// 定义中间件
router.use(timeLog);

// 定义路由---登录
router.post("/login", function (req, res) {
  console.log("req :>> ", req.body);
  res.json("login");
});

export default router;
