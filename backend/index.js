
const db = require("./db")
const cors = require("cors");
const express = require('express')
const app = express()
const port = 5000

app.use(cors());

app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

