const request = require('supertest');

const app = require('../app.js');

const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/');
const db = require('../db/connection.js');

describe('app', () => {

  beforeEach(() => seed(testData));

  afterAll(() => db.end());

  describe('*', () => {
    it('404: responds with a message if endpoint does not exist', () => {
      return request(app)
        .get('/api/not_a_valid_endpoint')
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;

          expect(msg).toBe('Endpoint /api/not_a_valid_endpoint not found!');
        })
    })
  })

  describe('/api/topics', () => {
    describe('GET', () => {
      it('200: responses with topics array each containing slug and description properties', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            const { topics } = body;

            const expected = [
              {
                description: 'The man, the Mitch, the legend',
                slug: 'mitch'
              },
              {
                description: 'Not dogs',
                slug: 'cats'
              },
              {
                description: 'what books are made of',
                slug: 'paper'
              }
            ];
            expect(topics).toEqual(expected);
          })
      })
    })
  })

  describe('/api/articles', () => {
    describe('GET', () => {
      it('200: responds with an array of article objects, each with all the article properties and comment count', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            const { articles } = body;

            expect(Array.isArray(articles)).toBe(true);
            expect(articles).toHaveLength(12);

            for (const article of articles) {
              expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: expect.any(Number)
              })
            }
          })
      })

      it('200: responds with correct comment_count for articles', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            const { articles } = body;
            const articleWithId1 = articles.find(({ article_id }) => {
              return article_id === 1;
            });
            const articleWithId9 = articles.find(({ article_id }) => {
              return article_id === 9;
            })

            expect(articleWithId1.comment_count).toBe(11);
            expect(articleWithId9.comment_count).toBe(2);
          })
      })

      it('200: responds with an array sorted by date in descending order', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            const { articles } = body;

            expect(articles).toBeSorted({
              key: 'created_at',
              descending: true
            })
          })
      })
    })
  })
})