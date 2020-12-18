#!/usr/bin/env node

const redisService = require('../src/app/services/redis.service');

async function start() {
  const option = process.argv[2];
  let isVerbose = false;

  if (['-v', '--verbose'].includes(option)) {
    console.log('Starting verbose mode');
    isVerbose = true;
  }

  const keys = await redisService.keysPromisified('*');

  if (isVerbose) {
    console.log(keys);
  }

  const keyPromises = keys.map(key => {
    if (isVerbose) {
      console.log(`Deleting ${key}`);
    }

    return redisService.delPromisified(key);
  });

  await Promise.all(keyPromises);

  process.exit(0);
}

start();
