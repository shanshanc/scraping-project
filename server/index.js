require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const router = require('./router');


const app = new Koa();
const port = process.env.PORT || 4100;

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes());

app.listen(port, () => console.log(`Server running at port ${port}`)); // eslint-disable-line

