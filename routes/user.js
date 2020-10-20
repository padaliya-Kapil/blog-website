// this is routing done using express
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require(__dirname+'/../model/userschema');
const bodyParser = require('body-parser');
const session = require('express-session');


const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static("public"));

const User = mongoose.model('User', userSchema);

router.use(session({secret: 'ssshhhhh',
resave: true,
saveUninitialized: true
}));


router.route('/signup')
.get((req,res)=>{
    res.render('signup');
})

.post((req,res)=>{
console.log("Hello 31");
const myPlaintextPassword = req.body.password;

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {

      const neweUser = new User({ name: req.body.name, email : req.body.email , password : hash });
      neweUser.save( (err) =>{
        if (err) return console.error(err);
        console.log(req.body);
        res.redirect('/signin');
      });
 
    });
});
});

router.route('/logout')
.post((req,res)=>{
  req.session.destroy(function(err) {
    // cannot access session here
    res.redirect('signup');
  })
  
});

router.route('/signin')
.get((req,res)=>{
  res.render('signin');
})
.post((req,res)=>{
  console.log(req.body);
  User.findOne({email:req.body.email},(err,user)=>{

    if(!err && user!==null){
          // Load hash from your password DB.
    bcrypt.compare(req.body.password, user.password, function(err, result) {
    if(result){
      
      req.session.loggedin = true;
			req.session.userid = user._id;
      res.redirect('/home')
    }
    else{
      res.render('signin',{message:"Please sign in with correct credentials!"});
    }
  });
    }

  });

});
module.exports = router;
