const express = require("express");
const router = express.Router();
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });

const users = [
  {
    email: "abc@abc.ca",
    firstName: "ABC",
    id: "5abf6783",
  },
  {
    email: "xyz@xyz.ca",
    firstName: "XYZ",
    id: "5abf674563",
  },
];

//get all user details
router.get("/users", (req, res) => {
  res.status(200).json({ message: "Users retrieved", success: true, users });
});

//get specific user details
router.get("/users/:id", (req, res) => {
  const inputId = req.params.id;
  if (inputId) {
    const user = users.filter((item) => item.id === inputId);
    res.status(200).json({ success: true, user });
  } else {
    res.status(500).json({ message: "Error" });
  }
});

// update specific user details
router.post("/update/:id", (req, res) => {
  try {
    const inputId = req.params.id;
    const input = req.body;

    if (input?.email && input?.firstName) {
      users.forEach((item) => {
        if (item.id === inputId) {
          item.email = input.email;
          item.firstName = input.firstName;
        }
      });
      res.status(200).json({ message: "User updated", success: true });
    } else {
      res.status(400).json({ message: "Bad request invalid parameters" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
});

// add new user
router.post("/add", (req, res) => {
  try {
    const input = req.body;
    input["id"] = uid();

    if (input?.email && input?.firstName) {
      users.push(input);
      res.status(200).json({ message: "User added", success: true });
    } else {
      res.status(400).json({ message: "Bad request invalid parameters" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
});

module.exports = router;
