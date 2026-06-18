import travelModel from "../models/travelModel.js";

const controller = {
  getAll: (req, res) => {
    res.send("get all travels");
  },
  getById: (req, res) => {
    res.send(`get travel by ID ${req.params.id}`);
  },
  create: (req, res) => {
    const travel = req.body;
    const newTravel = travelModel.create(travel);
    res.status(201).send(`create travel with name ${JSON.stringify(travel.name)}`);
  },
  update: (req, res) => {
    const travel = req.body;
    const travelId = req.params.id;
    const updatedTravel = travelModel.update(travelId, travel);
    res.send(`update travel by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const travelId = req.params.id;
    const deletedTravel = travelModel.delete(travelId);
    res.send(`delete travel by id ${req.params.id}`);
  },
};
export default controller;
