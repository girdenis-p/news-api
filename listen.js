const app = require('./app.js');
const { PORT = 7777 } = process.env

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
})