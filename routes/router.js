import express from "express";
import { home, login, dashboard } from "../controller/controller.js";
const router = express.Router();

router.get("/", home);

router.get("/SignIn", login);

router.get("/Dashboard", dashboard);



export default router;