module.exports = {

  //This middleware is intended invoked after the router has handled all possible urls 
  handle400StatusCodes: function(err, req, res, next) {
    if (err.status === 404) {
      res.status(404).send({msg: `Endpoint ${req.url} not found!`})
    } else {
      next(err);
    }
  },

  handle500StatusCodes: function(err, req, res, next) {
    console.log(err);

    res.sendStatus(500);
  }
}