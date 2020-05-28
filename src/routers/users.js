const express = require("express");

const User = require("../model/User");
var router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
  // User.find({})
  //   .then((users) => {
  //     res.status(200).send(users);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }

  // User.findById(req.params.id)
  //   .then((users) => {
  //     if (!users) {
  //       return res.status(400).send();
  //     }
  //     res.status(200).send(users);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  // user
  //   .save()
  //   .then((u) => {
  //     res.status(201);
  //     res.send(user);
  //     console.log(u);
  //   })
  //   .catch((err) => {
  //     res.status(400);
  //     res.json(err);
  //   });
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    if (!users) {
      return res.status(404).send(`User ${req.params.id} not found`);
    }
    const count = await User.countDocuments({});
    res.status(200).send(`User deleted. There's still ${count} users.`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedMethods = ["name", "age", "email", "password"];

  const isValidOperation = updates.every((update) =>
    allowedMethods.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const user = await User.findByIdAndUpdate(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    user.save();
    console.log(user);
    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
