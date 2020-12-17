const request = require('supertest');
const express = require('express');

const setHomeRoute = require('./home.route');

const app = express();

setHomeRoute(app);

describe('home.route.js', () => {
  describe('/', () => {
    it('GET should return Hello world', async () => {
      const response = await request(app).get('/');

      expect(response.text).toContain('Hello world');
    });
  });

  describe('/coucou', () => {
    it('GET should return Orange!', async () => {
      const response = await request(app).get('/coucou');

      expect(response.text).toContain('Orange!');
      expect(response.statusCode).toBe(200);
    });
  });
});
