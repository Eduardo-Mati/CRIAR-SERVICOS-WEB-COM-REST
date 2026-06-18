import express from "express";
import fleetsController from "../controllers/fleetsController.js";

const router = express.Router();

router.post("/", fleetsController.create);

router.get("/", fleetsController.getAll);

router.get("/:id", fleetsController.getById);

router.put("/:id", fleetsController.update);

router.delete("/:id", fleetsController.delete);

export default router;
