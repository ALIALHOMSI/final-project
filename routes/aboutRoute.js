import express from "express";
import aboutController from "../controller/aboutController.js";

const router = express.Router();
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

router.route("/").get(aboutController.getAbout);
router.route("/add").post(aboutController.addAbout);
router.route("/:id").put(aboutController.editAbout);
router.route("/:id").delete(aboutController.removeAbout);

export default router;
