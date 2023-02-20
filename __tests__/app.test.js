const request = require('supertest');

const app = require('../app.js');

const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/');
const db = require('../db/connection.js');

describe('app', () => {

  beforeEach(() => seed(testData));

  afterAll(() => db.end());

  describe('/api/topics', () => {
    describe('GET', () => {
      it('200: responses with topics array each containing slug and description properties', () => {
        
      })
    })
  })
})