module.exports = {

  handle500StatusCodes: function(err, req, res, next) {
    console.log(err);

    res.sendStatus(500);
  }
}