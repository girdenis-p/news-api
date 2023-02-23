module.exports  = {

  checkLimitAndPValid(limit, p) {
    return new Promise((resolve, reject) => {
      if (limit) {
        if (Number.isNaN(+limit)) {
          reject({status: 400, msg: 'Limit must be numeric'})
        }
      }

      if (p) {
        if (Number.isNaN(+p)) {
          reject({status: 400, msg: 'Page must be numeric'})
        }
      }

      resolve();
    })
  }

}