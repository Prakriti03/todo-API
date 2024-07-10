import express from "express";
import {login} from "../controller/auth.controller";
import { refresh } from "../services/auth.service";

const router = express();

router.post("/login", login);

router.post('/refresh', (req, res) => {
    const { oldRefreshToken } = req.body;
  
    const tokens = refresh(oldRefreshToken);
  
    if (tokens.message) {
      return res.status(400).json({ message: tokens.message });
    }
  
    return res.json(tokens);
});

export default router;