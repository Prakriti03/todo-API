import express from "express";
import { authentication, authorize } from "../middlewares/auth.middleware";
import { getUserbyId, getUsers } from "../controller/user.controller";
import { createUser } from "../controller/user.controller";
import { deleteUser } from "../controller/user.controller";
import { updateUser } from "../controller/user.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createBrotliCompress } from "zlib";
import {
  createUserBodySchema,
  getUserQuerySchema,
  updateUserSchema,
} from "../schema/user.schema";
import { getUserbyQuery } from "../controller/user.controller";

const router = express();

router.post(
  "/signup",
  authentication,
  authorize("user.createUser"),
  validateReqBody(createUserBodySchema),
  createUser
);

router.get("/", authentication, authorize("user.get"), getUsers);

router.get(
  "/user",
  authentication,
  authorize("admin"),
  validateReqBody(getUserQuerySchema),
  getUserbyQuery
);

router.get("/:id", authentication, authorize('user.getUserbyId'), getUserbyId);

router.delete("/:id", authentication, authorize('user.deleteUser'), deleteUser);

router.put(
  "/:id",
  authentication,
  authorize("user.updateUser"),
  validateReqBody(updateUserSchema),
  updateUser
);

export default router;
