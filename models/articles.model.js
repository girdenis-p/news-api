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
    `)
      .then(({ rows }) => {
        rows.forEach(row => {
          row.comment_count = Number(row.comment_count);
        })

        return rows;
      });
  }
}