const express = require('express')
const app = express()
const connectToMongo = require('./db')
connectToMongo();

app.use(express.json())



app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`)
})
