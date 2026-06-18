import express from "express";
import travelController from "../controllers/travelController.js";

const router = express.Router();

router.post("/", travelController.create);

router.get("/", travelController.getAll);

router.get("/:id", travelController.getById);

router.put("/:id", travelController.update);

router.delete("/:id", travelController.delete);

export default router;
