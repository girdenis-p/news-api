module.exports  = {

  checkLimitAndPValid(limit, page) {
    return new Promise((resolve, reject) => {
      if (limit) {
        if (Number.isNaN(+limit)) {
          reject({status: 400, msg: 'Limit must be numeric'})
        }
      }

      if (page) {
        if (Number.isNaN(+page)) {
          reject({status: 400, msg: 'Page must be numeric'})
        }
      }

      resolve();
    })
  },

  paginate(rows, limit = 10, page = 1) {
    const total_count = rows.length;
    const paginatedRows = rows.slice((page - 1) * limit, page * limit)

    return {rows: paginatedRows, total_count}
  }

}