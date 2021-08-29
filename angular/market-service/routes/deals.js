var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let jsonResponse = {
    "handsetCards": [
      { imageName: "1", title: '10% off', cols: 1, rows: 1 },
      { imageName: "2", title: '15% off', cols: 1, rows: 1 },
      { imageName: "3", title: '30% off', cols: 1, rows: 1 },
      { imageName: "4", title: '35% off', cols: 1, rows: 1 }
    ],
    "webCards": [
      { imageName: "1", title: '10% off', cols: 2, rows: 1 },
      { imageName: "2", title: '15% off', cols: 1, rows: 1 },
      { imageName: "3", title: '30% off', cols: 1, rows: 2 },
      { imageName: "4", title: '35% off', cols: 1, rows: 1 }
    ]
  }


  res.json(jsonResponse);
  //res.send('Deals route');
});

module.exports = router;
