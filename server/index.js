const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const router = require('./router');


const app = new Koa();
const port = 4100;

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes());

app.listen(port, () => `Server running at port ${port}`);

