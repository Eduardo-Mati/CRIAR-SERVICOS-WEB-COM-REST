import fleetsModel from "../models/fleetsModel.js";

const controller = {
  getAll: (req, res) => {
    res.send("get all fleets");
  },
  getById: (req, res) => {
    res.send(`get fleet by ID ${req.params.id}`);
  },
  create: (req, res) => {
    const fleet = req.body;
    const newFleet = fleetsModel.create(fleet);
    res.status(201).send(`create fleet with name ${JSON.stringify(fleet.name)}`);
  },
  update: (req, res) => {
    const fleet = req.body;
    const fleetId = req.params.id;
    const updatedFleet = fleetsModel.update(fleetId, fleet);
    res.send(`update fleet by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const fleetId = req.params.id;
    const deletedFleet = fleetsModel.delete(fleetId);
    res.send(`delete fleet by id ${req.params.id}`);
  },
};
export default controller;
