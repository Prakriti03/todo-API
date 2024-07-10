import express from "express";
import { auth } from '../middlewares/auth.middleware';

import { createUser } from '../controller/user.controller';

const router = express();

router.post("/", createUser);

export default router;
