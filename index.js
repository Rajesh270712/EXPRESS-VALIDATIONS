const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(cors());
app.use(express.json());

let userDetails = [];

app.post(
  "/login",
  body("first_name").isLength({ min: 2 }),
  body("last_name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("pincode").isLength({ min: 6, max: 6 }),
  body("gender").isLength({ min: 2 }),
  body("age").isLength({ min: 1, max: 2 }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userDetails.push(req.body);
    res.send("User successfully login");
  }
);

app.get("/user", (req, res) => {
  res.send(userDetails);
});
app.listen(3000);
