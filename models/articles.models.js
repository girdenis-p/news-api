const db = require('../db/connection.js');

module.exports = {
  
  selectArticles: function({topic, sort_by, order}) {
    let articlesQuery = `
    SELECT arts.author AS author, title, arts.article_id AS article_id, topic, arts.created_at AS created_at, arts.votes AS votes, article_img_url, COUNT(coms.article_id) AS comment_count
    FROM
      articles arts
      LEFT OUTER JOIN comments coms
        ON arts.article_id = coms.article_id`
    const queryParams = [];
    
    if (topic) {
      articlesQuery += ' WHERE topic = $1 '
      queryParams.push(topic)
    }

    articlesQuery += ' GROUP BY arts.author, title, arts.article_id, topic, arts.created_at, arts.votes, article_img_url '
    
    if (sort_by === undefined) {
      sort_by = 'created_at';
    }

    if (![
      'author',
      'title',
      'article_id', 
      'topic', 
      'created_at', 
      'votes', 
      'article_img_url', 
      'comment_count'
    ].includes(sort_by)) {
      return Promise.reject({status: 400, msg: `Articles cannot be sorted by "${sort_by}"`})
    }

    if (order === undefined) {
      order = 'desc'
    }

    if (!['asc', 'desc'].includes(order)) {
      return Promise.reject({status: 400, msg: `The only valid order options are "asc" or "desc", received: "${order}"`})
    }

    articlesQuery += ` ORDER BY ${sort_by} ${order}`

    return db.query(articlesQuery, queryParams)
      .then(({ rows }) => {
        rows.forEach(row => {
          row.comment_count = Number(row.comment_count);
        })

        return rows;
      });
  },

  updateArticleVotes(article_id, inc_votes) {
    if (inc_votes !== undefined && typeof inc_votes !== 'number') {
      return Promise.reject({status: 400, msg: 'inc_votes must be of type number'})
    }

    return db.query(`
    UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;
    `, [article_id, inc_votes])
    .then(({ rows }) => rows[0]);
  },

  selectArticleById: function(article_id) {
    return db.query(`
    SELECT arts.author AS author, title, arts.article_id AS article_id, arts.body AS body, arts.created_at AS created_at, topic, arts.votes AS votes, article_img_url, COUNT(coms.article_id) AS comment_count
    FROM
      articles arts
      LEFT OUTER JOIN comments coms
        ON arts.article_id = coms.article_id
    WHERE arts.article_id =  $1
    GROUP BY arts.author, title, arts.article_id, arts.body, arts.created_at, arts.votes, topic, article_img_url
    `, [article_id])
      .then(({ rows }) => {
        if (rows.length) {
          rows[0].comment_count = Number(rows[0].comment_count);

          return rows[0];
        } else {
          return Promise.reject({status: 404, msg: `Article with article_id ${article_id} does not exist`});
        }
      })
  }
}