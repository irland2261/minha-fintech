app.get("/painel", (req, res) => {
  res.send(`
    <html>
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
