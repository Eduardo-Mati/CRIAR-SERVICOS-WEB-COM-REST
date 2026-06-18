import driversModel from "../models/driversModel.js";

const controller = {
  getAll: (req, res) => {
    res.send("get all drivers");
  },
  getById: (req, res) => {
    res.send(`get driver by ID ${req.params.id}`);
  },
  create: (req, res) => {
    const driver = req.body;
    const newDriver = driversModel.create(driver);
    res.status(201).send(`create driver with name ${JSON.stringify(driver.name)}`);
  },
  update: (req, res) => {
    const driver = req.body;
    const driverId = req.params.id;
    const updatedDriver = driversModel.update(driverId, driver);
    res.send(`update driver by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const driverId = req.params.id;
    const deletedDriver = driversModel.delete(driverId);
    res.send(`delete driver by id ${req.params.id}`);
  },
};
export default controller;
