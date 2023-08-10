const express = require("express");

const { UserModel } = require("../models/users.model");

const userRouter = express.Router();

// Get Route
userRouter.get("/", async (req, res) => {
  const { q } = req.query;

  if (q) {
    const users = await UserModel.find({
      Fname: { $regex: q, $options: 'i' }
    });
    if (users.length) {
      res.status(200).send(users);
      //console.log(users, "users");
      return;
    }

    if (!users.length) {
      const user = await UserModel.find({
        Lname: { $regex: q, $options: 'i' }
      });
      res.status(200).send(user);
    } else {
      console.log(error);
      res.status(404).send({ msg: "Not Able to Get UserData from Server" });
    }
  } else {
    try {
      const users = await UserModel.find();
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(404).send({ msg: "Not Able to Get UserData from Server" });
    }
  }
});

// special get route
userRouter.get("/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await UserModel.findOne({ _id: userID });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Not Able to Get UserData from Server" });
  }
});

// Post Route
userRouter.post("/add", async (req, res) => {
  try {
    const addUser = new UserModel(req.body);
    await addUser.save();
    res.status(200).send({ msg: "user has been Successfully added " });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "something went Wrong, user has not been added! " });
    console.log(error);
  }
});

// Update Route
userRouter.patch("/update/:userID", async (req, res) => {
  try {
    const payload = req.body;
    const userID = req.params.userID;
    console.log(userID);
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userID },
      payload,
      {
        new: true, // This ensures the updated user is returned
      }
    );

    if (updatedUser) {
      res
        .status(200)
        .send({ msg: "User details have been successfully updated" });
    } else {
      res.status(400).send({ msg: "User not found or something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error occurred while updating user details" });
  }
});

// Delete Route
userRouter.delete("/delete/:userID", async (req, res) => {
  const userID = req.params.userID;
  console.log(userID, typeof userID);

  const user = await UserModel.findOne({ _id: userID });

  if (user) {
    await UserModel.findByIdAndDelete({ _id: userID });
    res
      .status(200)
      .send({ msg: "User Details has been successfully Deleted!" });
  } else {
    res.status(400).send({ msg: "Something went wrong, Details not Delteted" });
  }
});

module.exports = {
  userRouter,
};
