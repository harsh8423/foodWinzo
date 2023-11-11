
const db = require("./db")
const cors = require("cors");
const express = require('express')
const app = express()
const port = 5000

const allowedOrigins = [
  "http://localhost:19006",
  "http://192.168.0.167:8081",
  // Add more origins as needed
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

