import type { Router } from "express";
import login from "./login/index";

const routes = new Map<string, Router>([["/", login]]);

export default routes;
