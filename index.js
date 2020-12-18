const server = require("./src/server");
require('./src/io')

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
