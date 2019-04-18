const Router = require('koa-router');
const router = new Router();
const controller = require('./controller');

router
  .get('/', controller.getProductFeed)
  .get('/csvfeed', controller.generateCsv)
  .post('/create', controller.createOneProduct);

module.exports = router;