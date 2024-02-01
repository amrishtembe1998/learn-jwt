import express from "express";
import { login, register } from "../Controllers/AuthControllers.js";
const router = express.Router();

router.post("");
router.post("/register", register);
router.post("login", login);

export default router;