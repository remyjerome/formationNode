const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_URL, {
  no_ready_check: true
});

client.on('error', function(error) {
  console.error(error);
});

const getPromisified = promisify(client.get).bind(client);
const setPromisified = promisify(client.set).bind(client);

module.exports = {
  ...client,
  getPromisified,
  setPromisified
};
