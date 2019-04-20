const Router = require('koa-router');
const router = new Router();
const controller = require('./controller');

router
  .get('/', controller.getProductFeed)
  .get('/fetch', controller.scrapSite)
  .get('/csvfeed', controller.generateCsv)
  .post('/create', controller.createOneProduct);

module.exports = router;