const express = require("express");
const app = express();

app.use(express.json());

// carteira simples
let saldo = 100;

// pagar
app.post("/pay", (req, res) => {
  const { valor } = req.body;

  if (valor > saldo) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  saldo -= valor;

  res.json({
    message: "Pagamento aprovado 💳",
    saldoAtual: saldo
  });
});

// ver saldo
app.get("/balance", (req, res) => {
  res.json({ saldo });
});

app.get("/", (req, res) => {
  res.send("API fintech rodando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
