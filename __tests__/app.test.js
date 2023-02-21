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

  describe('/api/articles/:article_id', () => {
    describe('GET', () => {
      it('200: responds with article object with given article_id', () => {
        return request(app)
          .get('/api/articles/2')
          .expect(200)
          .then(({ body }) => {
            const { article } = body;

            const expected = {
              article_id: 2,
              title: 'Sony Vaio; or, The Laptop',
              topic: 'mitch',
              author: 'icellusedkars',
              body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
              created_at: '2020-10-16T05:03:00.000Z',
              article_img_url:
                'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
              votes: 0
            };
            expect(article).toMatchObject(expected);
          })
      })

      it('404: responds when passed a valid article_id that does not exist', () => {
        return request(app)
          .get('/api/articles/999999')
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;

            expect(msg).toBe('Article with article_id 999999 does not exist');
          })
      })

      it('400: responds when passed a non numeric article_id', () => {
        return request(app)
          .get('/api/articles/not_a_valid_article_id')
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;

            expect(msg).toBe('Bad request, expected numeric id');
          })
      })
    })

    describe('PATCH', () => {
      it('202: responds with article incremented by inc_votes in body', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({
            inc_votes: 23
          })
          .expect(202)
          .then(({ body }) => {
            const { article } = body;

            expect(article).toMatchObject({
              article_id: 1,
              votes: 123,
              topic: 'mitch',
              author: 'butter_bridge',
              body: 'I find this existence challenging'
            })
          })
      })

      it('400: responds when given invalid :article_id', () => {
        return request(app)
          .patch('/api/articles/invalid')
          .send({
            inc_votes: 12
          })
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;

            expect(msg).toBe('Bad request, expected numeric id')
          })
      })

      it('404: responds when given valid but non existent :article_id', () => {
        return request(app)
          .patch('/api/articles/1000')
          .send({
            inc_votes: 1
          })
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;

            expect(msg).toBe('Article with article_id 1000 does not exist')
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

  describe('/api/articles/:article_id/comments', () => {
    describe('GET', () => {
      it('200: responds with an empty comments array when valid :article_id is given for an article with no comments', () => {
        return request(app)
          .get('/api/articles/2/comments')
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;

            expect(comments).toEqual([]);
          })
      })

      it('200: responds with an array of comments objects when corresponding to given :article_id', () => {
        return request(app)
          .get('/api/articles/3/comments')
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;

            const expected = [
              {
                comment_id: 10,
                body: 'git push origin master',
                article_id: 3,
                author: 'icellusedkars',
                votes: 0,
                created_at: '2020-06-20T07:24:00.000Z'
              },
              {
                comment_id: 11,
                body: 'Ambidextrous marsupial',
                article_id: 3,
                author: 'icellusedkars',
                votes: 0,
                created_at: '2020-09-19T23:10:00.000Z'
              }
            ];
            expect(comments[0]).toMatchObject(expected[0]);
            expect(comments[1]).toMatchObject(expected[1]);
          })
      })

      it('400: responds when given an invalid :article_id', () => {
        return request(app)
          .get('/api/articles/invalid_article_id/comments')
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;

            expect(msg).toBe('Bad request, expected numeric id')
          })
      })

      it('404: responds when given a valid :article_id that does not exist', () => {
        return request(app)
          .get('/api/articles/654321/comments')
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;

            expect(msg).toBe('Article with article_id 654321 does not exist')
          })
      })
    })
  })
})