const express = require("express");

const Task = require("../model/Task");
var router = new express.Router();

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }

  // .then((tasks) => {
  //   if (!tasks) {
  //     return res.status(400).send();
  //   }
  //   res.status(200).send(tasks);
  // })
  // .catch((err) => {
  //   res.status(500).send(err);
  // });
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) {
      res.status(404).send();
    }
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }

  // Task.find({})
  //   .then((tasks) => {
  //     res.status(200).send(tasks);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
});

router.post("/tasks", async (req, res) => {
  try {
    console.log(req.body);
    const task = new Task(req.body);
    await task.save();
    res.status(200).send(task);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
  // task
  //   .save()
  //   .then((t) => {
  //     res.status(201);
  //     res.send(t);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(400).send();
    }
    const count = await Task.countDocuments({ completed: false });
    return res
      .status(200)
      .send(`Object deleted, there's ${count} tasks incompleted.`);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedMethods = ["description", "completed"];

  const isValidOperation = updates.every((update) =>
    allowedMethods.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    task.save();
    console.log(task);
    if (!task) {
      res.status(404).send();
    }

    res.status(201).send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
