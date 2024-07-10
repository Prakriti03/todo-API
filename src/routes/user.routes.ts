import express from "express";
import { auth } from '../middlewares/auth.middleware';
import { getUserbyId } from '../controller/user.controller';

import { createUser } from '../controller/user.controller';

const router = express();

router.post("/", createUser);

export default router;
