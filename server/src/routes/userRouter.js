import express from "express";
const router = express.Router();

import { isAuthenticated } from "../middleware/auth.js";
import {
     signIn,
     signUp,
     getUserProfile,
     logOut,
     deleteUser,
} from "../controllers/userController.js";

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/logout", isAuthenticated, logOut);
router.delete("/delete", isAuthenticated, deleteUser);

export default router;
