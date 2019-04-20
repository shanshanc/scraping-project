const Router = require('koa-router');
const router = new Router();
const { ctrlProduct, ctrlHistory } = require('./controller/');

router
  .get('/', ctrlProduct.getProductFeed)
  .get('/fetch', ctrlProduct.scrapSite)
  .get('/csvfeed', ctrlProduct.generateCsv)
  .get('/txtfeed', ctrlProduct.generateTxt) 
  .post('/create', ctrlProduct.createOneProduct)
  .get('/history', ctrlHistory.getAllRecords)
  .post('/addonerecord', ctrlHistory.postOneRecord);


module.exports = router;