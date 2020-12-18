const { promisify } = require('util');

const Twig = require('twig');

const renderFilePromisified = promisify(Twig.renderFile);

module.exports = async function errorHandler(err, req, res, next) {
  try {
    const html = await renderFilePromisified('./src/app/middleware/error.twig', {
      err
    });
    res.send(html);
  } catch (err) {
    console.error(err);
  }
};