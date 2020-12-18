const request = require('supertest');
const express = require('express');

const setLoginRoute = require('./login.route');
const bodyParser = require('body-parser');
const redis = require('../app/services/redis.service');

jest.mock('../app/services/redis.service', () => ({
  getPromisified: jest.fn(),
  setPromisified: jest.fn()
}));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setLoginRoute(app);

describe('login.route.js', () => {
  describe('/login', () => {
    it('POST', async () => {
      redis.getPromisified.mockImplementationOnce( async ()=> '{}');
      const response = await request(app).post('/login').send({ name: 'blabla' });
  
      expect(response.text).toContain('Hello world');
    });
  });
});
  