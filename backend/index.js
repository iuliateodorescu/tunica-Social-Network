const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const userRoute = require('./routes/user')
const profileRoute = require('./routes/profile')
const cors = require('cors')
const routes = require ('./routes/routes.js')
app.use(cors())
app.use(express.json())
if (!config.get('privateKey')) {
  console.error('FATAL ERROR: private key not defined')
  process.exit(1)
}

console.log('Connecting to mongo...')

mongoose
  .connect('mongodb://172.17.0.1/studnet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')

    app.use('/api/',routes)
    app.use('*',(req,res) => {
      res.status(404).send("Route not found, try using /api")
  })

    app.listen(3000, () => console.log(`Listening on port 3000`))
  })
