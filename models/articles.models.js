const db = require('../db/connection.js');
const { paginate } = require('../utils/pagination.js');

module.exports = {
  
  selectArticles({topic, sort_by = 'created_at', order = 'desc', limit, p}) {
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

    if (!['asc', 'desc'].includes(order)) {
      return Promise.reject({status: 400, msg: `The only valid order options are "asc" or "desc", received: "${order}"`})
    }

    articlesQuery += ` ORDER BY ${sort_by} ${order}`

    return db.query(articlesQuery, queryParams)
      .then(({ rows }) => {
        return paginate(rows, limit, p)
      })
      .then(({ rows: articles , total_count}) => {
        articles.forEach(article => {
          article.comment_count = Number(article.comment_count);
        })

        return {articles, total_count};
      });
  },

  updateArticleVotes(article_id, inc_votes) {
    return db.query(`
    UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;
    `, [article_id, inc_votes])
    .then(({ rows }) => rows[0]);
  },

  selectArticleById(article_id) {
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
  },

  insertArticle({author, title, body, topic, article_img_url }) {
    const queryParams = [author, title, body, topic]

    let columns = 'author, title, body, topic'
    let values = '$1, $2, $3, $4'

    //If article_img_url is not present then excluding it from the query with default it
    if (article_img_url) {
      values += ', $5'
      columns += ', article_img_url'
      queryParams.push(article_img_url)
    }

    return db.query(`
    INSERT INTO articles
      (${columns})
    VALUES
      (${values})
    RETURNING *;
    `, queryParams)
      .then(({ rows }) => {
        const article = rows[0];

        //By default, comment_count will be 0. This acceptable to do as there is no comment_count column in articles
        article.comment_count = 0;

        return article;
      })
  }
}