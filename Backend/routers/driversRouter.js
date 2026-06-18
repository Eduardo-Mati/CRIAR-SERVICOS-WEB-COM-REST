import express from "express";
import driversController from "../controllers/driversController.js";

const router = express.Router();

router.post("/", driversController.create);

router.get("/", driversController.getAll);

router.get("/:id", driversController.getById);

router.put("/:id", driversController.update);

router.delete("/:id", driversController.delete);

export default router;
