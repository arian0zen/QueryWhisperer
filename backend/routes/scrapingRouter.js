const router = require('express').Router();
const scrape = require('../controller/scrapingController');
const recscraper = require('../controller/recscrapingController');


router.route('/').get(scrape);
router.route('/recscrape').get(recscraper);

module.exports = router;

//added a comment
