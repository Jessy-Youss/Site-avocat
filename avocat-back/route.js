var express = require('express');
var app = express();
var mongoose = require('./B.D.D');
var cors = require('cors')
var bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Mail : Recevoir question du cllient.
app.post('/mail1',(req,res)=>{
  var api_key = api_key;
  var domain = domain;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var nom = req.body.nom
  var email = req.body.email
  var message = req.body.message
  
  var data = {
    from: email,
    to: 'testtest@gmail.com',
    subject: 'Question de '+nom,
    text: message
  };
   
  mailgun.messages().send(data, function (error, body) {
    if(error){
      console.log("Error!")
    }
    else{
      console.log("sa fonctionne")
    }
  });
  
})

// Mail : Envoyer confirmation du RDV au cllient.
app.post('/mail2',(req,res)=>{
var nodemailer = require('nodemailer');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
var JourRdv = req.body.jour
var HeureRdv = req.body.heure
var Nom = req.body.nom
var Email= req.body.email

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testtest@gmail.com',
    pass: '123456'
  }
});

var mailOptions = {
  from: 'testtest@gmail.com',
  to: Email,
  subject: 'Confirmation du RDV',
  text: "Bonjour Madame, Monsieur "+Nom+", nous vous confirmons votre rendez vous le "+JourRdv+" à l'heure de "+HeureRdv+" ."
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})
//Insert new collection
const Schema = mongoose.Schema;
const joursRDV = new Schema({
  date : String,
  heure : String,
  nom: String,
  mail: String
});
const _joursRDV1 = mongoose.model('avocat1' , joursRDV);
const _joursRDV2 = mongoose.model('avocat2' , joursRDV);

//Afficher les heures disponible.
app.get('/recupHeur1',(req,res)=>{
  var Jour = req.query.jour
  _joursRDV1.find({date:Jour},(err,obj)=>{
    res.send(obj)
  })
})

app.get('/recupHeur2',(req,res)=>{
  var Jour = req.query.jour
  _joursRDV2.find({date:Jour},(err,obj)=>{
    res.send(obj)
  })
})

//Insérer un rdv
app.post('/insererRdv1',(req,res)=>{
  
  var JourRdv = req.body.jour
  var HeureRdv = req.body.heure
  var Nom = req.body.nom
  var Email= req.body.email
  console.log(req.body)
  _joursRDV1.collection.insertOne({date:JourRdv,heure:HeureRdv,nom:Nom,email:Email})
})

app.post('/insererRdv2',(req,res)=>{
  var JourRdv = req.body.jour
  var HeureRdv = req.body.heure
  var Nom = req.body.nom
  var Email= req.body.email
  _joursRDV2.collection.insertOne({date:JourRdv,heure:HeureRdv,nom:Nom,email:Email})
})

  app.listen(3000)


