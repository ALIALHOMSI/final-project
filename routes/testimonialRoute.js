import express from "express";

import testimonialController from "../controller/testimonialController.js";

const router = express.Router();
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

router.route("/").get(testimonialController.getAll);
router.route("/add").post(testimonialController.addTestimonial);
router.route("/:id").get(testimonialController.getOne);
router.route("/:id").delete(testimonialController.deleteTestimonial);
router.route("/:id").put(testimonialController.editTestimonial);

export default router;
