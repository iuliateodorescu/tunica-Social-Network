const jwt = require('jsonwebtoken')
const config = require('config')
const fs = require('fs')

module.exports = {
  decoded: headers => {
    const token = headers['x-auth-token']
    const decoded = jwt.verify(token, config.get('privateKey'))
    return decoded
  },

  getFile(filename) {
    return __dirname + '/../assets/images/' + filename
  },

  addOne(schema) {
    return async (req, res) => {
      try {
          console.log(req.body)
        const model = new schema(req.body)
        await model.save()
        res.sendStatus(201)
      } catch (err) {
        res.status(400).send(err)
      }
    }
  },

  getImage: async (req, res) => {
    const { filename } = req.params
    fs.readFile(generalMid.getFile(filename), function(err, data) {
      if (err) throw err
      res.send(data)
    })
  }
}
