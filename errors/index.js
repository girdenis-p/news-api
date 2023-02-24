module.exports = {

  handlePSQLErrors: function(err, req, res, next) {
    if (err.code === '22P02') {
      if (req.body.inc_votes !== undefined && typeof req.body.inc_votes !== 'number') {
        next({status: 400, msg: 'inc_votes must be of type number'})
      } else {  
        let idFor;
        
        const { path } = req.route;
        
        //Using path as this middleware has no access to params
        if (path.startsWith('/:comment_id')) {
          idFor = 'comment'
        } else if (path.startsWith('/:article_id')) {
          idFor = 'article'
        }
        
        next({status: 400, msg: `Expected numeric ${idFor}_id`})
      }
    } else if (err.code === '23502') {
      //23502 is caused due to a not null violation, this indicates that something is missing from the req.body
      const bodyProperties = Object.keys(req.body);

      //Templates are created when the controller for a given method and path is invoked
      const missingProperty = req.bodyTemplate.find(property => {
        return !bodyProperties.includes(property)
      });

      next({status: 400, msg: `Body must contain "${missingProperty}" property`})
    } else if (err.code === '23503') {
      //Note this err.code is due a foreign key violation. Which is caused when posting an article or comment with an invalid user
      next({status: 404, msg: `User with username "${req.body.author || req.body.username}" does not exist`})
    } else if (err.code === '23505') {
      //This err.code is due to a unique key violation which will occur when attempting to post a topic with an existing slug
      next({status: 409, msg: `Topic with slug "${req.body.slug}" already exists`})
    } else {
      next(err);
    }
  },

  handleCustomErrors: function(err, req, res, next) {
    if (err.status) {
      //Default message handling
      if (!err.msg) {
        err.msg = {
          404: `Endpoint ${req.url} not found!`
        }[err.status];
      }

      res.status(err.status).send({ msg : err.msg });
    } else {
      next(err);
    }
  },

  handle500StatusCodes: function(err, req, res, next) {
    console.log(err);

    res.sendStatus(500);
  }
}