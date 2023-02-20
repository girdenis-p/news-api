const app = require('./app.js');
const port = 7777;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
})