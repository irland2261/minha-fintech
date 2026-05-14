const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API WhatsApp online 🚀" });
});

app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.1307373424706833}/messages`,
      {
        messaging_product: "whatsapp",
        to: number,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EAAOH3cLVZCwYBRbsG9MPPfQOAE2zRkgaZB5qKEIGz5tonR3LH3ZASZBRBK4sCtK2cIPhkQeAurnE3pZBjnlfZAw2pVHhfy3LdhUTbclQBPnXekn9fZBbr5j5yzAsfZAZCKjczcsKOslPBMXZA5CzzSCuHzdsZB4uUrtTXOmZAACVHZBYJcvPhaIpgyfq99aHfvibUZANyHtzA86OAClZCE6kFcZBLbwIqFLOft4pDQLWrSMxS53EhroZAsYCYg9N2V0Ul7n5I9kiVo5J4dVnIhZA4LqTqETNAC}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.response?.data || err.message);
  }
});

module.exports = app;
