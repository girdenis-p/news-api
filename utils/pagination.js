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
  },

  paginate(rows, limit = 10, p = 1) {
    const total_count = rows.length;
    const paginatedRows = rows.slice((p - 1) * limit, p * limit)

    return {rows: paginatedRows, total_count}
  }

}