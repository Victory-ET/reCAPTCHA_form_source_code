
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const router = express.Router();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

router.post("/status", async (req, res) => {
  const { token } = req.body; // get token from the request we will create in index.js
  const secret = "YOUR SECRET KEY";

  await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`, // url
    {
        secret: secret,
        response: token,
    }, // URL parameters
  );

  //return response based on the status of the post request
  if (res.status(200)) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
