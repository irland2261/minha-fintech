require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json(    <html>
      <body style="font-family: Arial; padding: 30px;">
        <h2>Enviar WhatsApp 🚀</h2>

        <input id="number" placeholder="5511999999999" style="padding:10px;width:250px"/>
        <br><br>

        <input id="message" placeholder="Mensagem" style="padding:10px;width:250px"/>
        <br><br>

        <button onclick="send()" style="padding:10px 20px;">Enviar</button>

        <p id="status"></p>

        <script>
          async function send() {
            const number = document.getElementById('number').value;
            const message = document.getElementById('message').value;

            const res = await fetch('/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ number, message })
            });

            const data = await res.json();
            document.getElementById('status').innerText = JSON.stringify(data);
          }
        </script>
      </body>
    </html>
  `);
});

app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: number,
        type: "text",
        text: {
          body: message
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json(
      err.response?.data || {
        error: err.message
      }
    );
  }
});

module.exports = app;
