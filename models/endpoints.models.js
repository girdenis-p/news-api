const { readFile } = require('fs/promises')

module.exports = {

  readEndpoints: function() {
    return readFile(`${__dirname}/../endpoints.json`)
    .then(JSON.parse)
  }

}