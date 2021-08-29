var express = require('express');
var jwt = require('jsonwebtoken');
var fs = require('fs')
var router = express.Router();

/*router.get('/', function(req, res, next) {
  let jsonResponse = { email: "cedric-98@hotmail.co.uk", password: 'aze', _id: "612a454b78d3ca605acee684", __v: 0 }

  

  //res.json(jsonResponse);
});*/


let availableItems = [
  {
      "_id": "612a454b78d3ca605acee684",
      "name": "Prusa MK3S - A",
      "type": "Printer",
      "isDeleted": false,
      "isBorrowed": false
  },
  {
      "_id": "612a454b78d3ca605acee685",
      "name": "Prusa MK3S - B",
      "type": "Printer",
      "isDeleted": false,
      "isBorrowed": false
  },{
      "_id": "612a454b78d3ca605acee686",
      "name": "Prusa MK3S - C",
      "type": "Printer",
      "isDeleted": false,
      "isBorrowed": false
  },{
      "_id": "612a454b78d3ca605acee687",
      "name": "Prusa MK3S - D",
      "type": "Printer",
      "isDeleted": false,
      "isBorrowed": false
  }
]

    router.post('/register', (req, res) => {
    
    //let jsonResponse = { email: "cedric-98@hotmail.co.uk", password: 'aze', _id: "612a454b78d3ca605acee684", __v: 0 }
    
    //let payload = {subject: registeredUser._id}
    //let token = jwt.sign(payload, 'secretKey')

    //res.status(200).send(jsonResponse)

    /*let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({"body":"stuff"}, privateKey, {algorithm: 'HS256'});
    res.status(200).send({token});*/

    res.status(200).json("ok");
  });

  router.get('/secret', isAuthorized, (req, res) => {
    res.json({"message": "Super Secret Message"});
})

router.get('/readme', (req, res) => {
    res.json({"message": "Hello World"});
})

router.get('/jwt', (req, res) =>{
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({"body":"stuff"}, privateKey, {algorithm: 'HS256'});
    res.send(token);

})

function isAuthorized(req, res, next){
    if (typeof req.headers.authorization !== "undefined") {

        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');

        jwt.verify(token, privateKey, { algorithm: "HS256"}, (err, decoded) => {
            if (err){
                res.status(401).json({ error : "Not Autorized"})
            } else{
                console.log("decoded");
            }

            

            return next();
        })
    } else {
        res.status(500).json({ error: "Not Autorized"})
    }
}

router.post('/newmaterial', (req, res) => {

  console.log("New item : " + res)
  var obj = JSON.parse(availableItems);
  obj['theTeam'].push(res);
  availableItems = JSON.stringify(obj);
  res.status(200).json("ok");
})
  router.post('/login', (req, res) => {
    console.log("Login : " + res)
    let jsonResponse = { email: "cedric-98@hotmail.co.uk", password: 'aze', _id: "612a454b78d3ca605acee684", __v: 0 }

    /*let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send(jsonResponse)
      }
    })*/
    
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({"body":"stuff"}, privateKey, {algorithm: 'HS256'});
    res.status(200).send({token});

    //res.json(jsonResponse);
  });

  router.get('/availableItems', isAuthorized, (req, res) =>{
    

    res.json(availableItems);
  });

  router.get('/getback', isAuthorized, (req, res) =>{
    let jsonResponse = [
        {
            "_id": "612a454b78d3ca605acee688",
            "name": "Prusa MK3S - E",
            "type": "Printer",
            "isDeleted": false,
            "isBorrowed": false
        },
        {
            "_id": "612a454b78d3ca605acee689",
            "name": "Prusa MK3S - F",
            "type": "Printer",
            "isDeleted": false,
            "isBorrowed": false
        }
    ]

    res.json(jsonResponse);
  });


module.exports = router;
