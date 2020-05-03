const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const userRoute = require('./routes/user')
const profileRoute = require('./routes/profile')
const cors = require('cors')
const testRoute = require('./routes/test')
app.use(cors())
app.use(express.json())
if (!config.get('privateKey')) {
  console.error('FATAL ERROR: private key not defined')
  process.exit(1)
}

mongoose
  .connect('mongodb://localhost/studnet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to mongo'))


app.use('/api/user', userRoute)
app.use('/api/test',testRoute)
app.use('/api/profile', profileRoute)


app.listen(3000, () => console.log(`Listening on port 3000`))
