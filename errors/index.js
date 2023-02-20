module.exports = {

  catch505StatusCodes: function(req, res, next) {
    if (req.httpVersion >= 2) {
      res.sendStatus(505);
    } else {
      next();
    }
  },

  //This middleware is intended invoked after the router has handled all possible urls 
  catch404StatusCodes: function(req, res, next) {
    res.status(404).send({msg: `Endpoint ${req.url} not found!`});
  },

  handle500StatusCodes: function(err, req, res, next) {
    console.log(err);

    res.sendStatus(500);
  }
}