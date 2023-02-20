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
})