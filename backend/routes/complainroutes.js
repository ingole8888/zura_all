const express = require("express");
const complainModel = require("../models/complainmodel");
const complainController = express.Router();

complainController.post("/create",async (req, res) => {
    let { author_id, Email, respondents } = req.body;

    try {
      let parsedRespondents = {};
      if (typeof respondents === "string") {
        parsedRespondents = JSON.parse(respondents);
      } else {
        parsedRespondents = respondents;
      }

      const complain = new complainModel({
        author_id,
        Email,
        respondents: parsedRespondents,
      });
      await complain.save();

      return res
        .status(200)
        .send({ message: "Project register successfully", complain });
    } catch (error) {
      res.send(error);
    }
  }
);

complainController.get("/allcomplain", async (req, res) => {
  const { page, limit } = req.query;

  try {
    let query = complainModel.find();
    if (page && limit) {
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;
      const startIndex = (pageNumber - 1) * limitNumber;
      query = query.skip(startIndex).limit(limitNumber);
    }
    const complain = await query.exec();
      complain.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      res.send(complain);
  } catch (error) {
    res.send(error);
  }
});

complainController.get("/complainbyuser/:id", async (req, res) => {
  const id = req.params._id;
  try {
    const complain = await complainModel.find({ id });
    res.send(complain);
  } catch (error) {
    res.send(error);
  }
});

complainController.get("/complain/:id", async (req, res) => {
  const id = req.params._id;
  try {
    const complain = await complainModel.find({ id });
    res.send(complain);
  } catch (error) {
    res.send(error);
  }
});

complainController.put("/update/:id", async (req, res) => {
    const id = req.params.id;

    try {
      let updateData = { ...req.body };

      const updatedComplain = await complainModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      res.status(200).send(updatedComplain);
    } catch (error) {
      res.send(error);
    }
  }
);

complainController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const comp = await complainModel.findByIdAndRemove(id);
    res.send(comp);
  } catch (error) {
    res.send(error);
  }
});

module.exports = complainController;