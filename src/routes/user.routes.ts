import express from "express";
import { authentication, authorize } from '../middlewares/auth.middleware';
import { getUserbyId, getUsers } from "../controller/user.controller"
import { createUser } from '../controller/user.controller';

const router = express();

router.post("/signup", authentication, authorize("admin"),createUser);

router.get("/",authentication,authorize("admin"), getUsers);

router.get("/:id", authentication, authorize("admin"), getUserbyId);

export default router;
