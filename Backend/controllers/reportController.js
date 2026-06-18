import reportModel from "../models/reportModel.js";

const controller = {
  getAll: (req, res) => {
    res.send("get all reports");
  },
  getById: (req, res) => {
    res.send(`get report by ID ${req.params.id}`);
  },
  create: (req, res) => {
    const report = req.body;
    const newReport = reportModel.create(report);
    res.status(201).send(`create report with name ${JSON.stringify(report.name)}`);
  },
  update: (req, res) => {
    const report = req.body;
    const reportId = req.params.id;
    const updatedReport = reportModel.update(reportId, report);
    res.send(`update report by id ${req.params.id}`);
  },
  delete: (req, res) => {
    const reportId = req.params.id;
    const deletedReport = reportModel.delete(reportId);
    res.send(`delete report by id ${req.params.id}`);
  },
};
export default controller;
