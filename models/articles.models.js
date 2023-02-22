const db = require('../db/connection.js');

module.exports = {
  
  selectArticles: function() {
    return db.query(`
    SELECT arts.author, title, arts.article_id, topic, arts.created_at, arts.votes, article_img_url, COUNT(coms.article_id) AS comment_count
    FROM
      articles arts
      LEFT OUTER JOIN comments coms
        ON arts.article_id = coms.article_id
    GROUP BY arts.author, title, arts.article_id, topic, arts.created_at, arts.votes, article_img_url
    ORDER BY arts.created_at DESC;
    `)
      .then(({ rows }) => {
        rows.forEach(row => {
          row.comment_count = Number(row.comment_count);
        })

        return rows;
      });
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