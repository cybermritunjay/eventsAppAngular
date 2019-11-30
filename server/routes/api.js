const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const db= "mongodb+srv://cybermritunjay:Mp16m@0636@angularapp1-lnc4m.mongodb.net/test?retryWrites=true&w=majority";
const User = require('../models/user');
const Event = require('../models/event')
mongoose.connect(db, {useNewUrlParser: true}, (err) =>{
    if(err){
        console.error("Error! "+err);
    }else{
    console.log("connection successfull")
    }
});

function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send("unauthorizerd")
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token ===""){
    return res.status(401).send("unauthorizerd")
  }
  let payload = jwt.verify(token, "Mritunjay")
  if(!payload){
    return res.status(401).send("unauthorizerd")
  }
  req.userId = payload.subject
  next()
}

router.get('/',(req,res) => {
    res.send("from api route");
});
router.get('/events',(req,res) =>{
    let Events = [
      { id: 1, name: 'Event 1', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 2, name: 'Event 2', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 3, name: 'Event 3', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 4, name: 'Event 4', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 5, name: 'Event 5', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 6, name: 'Event 6', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 7, name: 'Event 7', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 8, name: 'Event 8', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 9, name: 'Event 9', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' },
      { id: 10, name: 'Event 10', date:'05/11/2019', place: 'Delhi', Description: 'Description of event' }
      
    ];
    res.json(Events);
})
router.get('/getEvents',(req,res) =>{
    Event.find({},(error,events) => {
        if(error){
            console.log(error);
        }else{
          res.status(200).send(events);
        }
      })
})
router.post('/getUserEvents',(req,res) =>{
    Event.find( {creator: req.body.creator},(error,events) => {
        if(error){
            console.log(error);
        }else{
          res.status(200).send(events);
        }
      })
})
router.post('/deleteUserEvents',(req,res) =>{
 console.log(req)
  Event.deleteOne( {creator: req.body.creator, _id:req.body.id},(error,addEvent) => {
    if(error){
        console.log(error);
        res.status(401)
    }else{
        res.status(200).send({addEvent});
    }
})
});
router.post('/createEvents',(req,res) =>{
    let eventData = req.body;
    let event = new Event(eventData);
    event.save((error,addEvent) => {
      if(error){
          console.log(error);
          res.status(401)
      }else{
          res.status(200).send({addEvent});
      }
  })
  });
router.post('/register',(req,res) => {
    let userData = req.body;
    let user = new User(userData);
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err) {
           console.log(err)
        }else{
            if (user) {
               res.status(401).send("A user with that email has already registered. Please use a different email..");
          } else {
            user.save((error,registerUser) => {
                if(error){
                    console.log(error);
                    res.status(401)
                }else{
                    let payload = { subject: registerUser._id};
                    let token = jwt.sign(payload, "Mritunjay")
                    res.status(200).send({token});
                }
            })
          }
        }

});
})

router.post('/login',(req,res) => {
    let userData = req.body;
    User.findOne({email:userData.email},(error,user) => {
        if(error){
            console.log(error);
        }else{
            if (!user){
                res.status(401).send("Invalid email Address");
            }else{
                if(user.password != userData.password){
                    res.status(401).send("Invalid Password");
                }else{
                  let payload = { subject: userData._id};
                  let token = jwt.sign(payload, "Mritunjay")
                    res.status(200).send({token,user});
                }
            }
        }
    })

});


module.exports = router;