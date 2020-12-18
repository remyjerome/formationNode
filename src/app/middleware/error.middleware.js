const { promisify } = require('util');

const Twig = require('twig');

const renderFilePromisified = promisify(Twig.renderFile);

module.exports = async function errorHandler(err, req, res, next) {
  if (req.headers['accept'].includes('text/html')) {
    const html = await renderFilePromisified(
      './src/app/middleware/error.twig',
      {
        err
      }
    );

    return res.send(html);
  }

  return res.json({ err });
};
