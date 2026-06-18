import express from "express";
import reportController from "../controllers/reportController.js";

const router = express.Router();

router.post("/", reportController.create);

router.get("/", reportController.getAll);

router.get("/:id", reportController.getById);

router.put("/:id", reportController.update);

router.delete("/:id", reportController.delete);

export default router;
