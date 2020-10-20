// this is routing done using express
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const blogSchema = require(__dirname+'/../model/blogschema');
const userSchema = require(__dirname+'/../model/userschema');
const bodyParser = require('body-parser');
const session = require('express-session');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static("public"));

router.use(session({secret: 'ssshhhhh',
resave: true,
saveUninitialized: true
}));


const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);


router.get('/home',function(req, res){
    if(req.session.loggedin){
    Blog.find({},(err,blogData)=>{
    res.render("post", {blogs: blogData} );
    })
    console.log(req.session);
}

});

router.get('/myposts',(req,res)=>{

    // todo implement logic
    Blog.find({postauthorid:req.session.userid},(err,blogData)=>{
        res.render("post", {blogs: blogData} );
        })
        // console.log(req.session);
});

router.get('/addpost',function(req, res){
    res.render("addpost" );
});

router.get('/post/:postid',function(req, res){
    console.log(req.params.postid);
    Blog.findById(req.params.postid,(err,post)=>{
        if(!err){

            console.log(req.session.userid);
            User.findById(req.session.userid,(error,user)=>{
                if(!error){
                    res.render("individualpost",{post:post,author:user.name});
                }
                
            });
        }
        
    });
    
});

router.get('/intro',function(req, res){
     res.render("intro" );
});

router.post('/addpost',(req,res)=>{

     const newPost = new Blog({ posttitle: req.body.posttitle, postcontent : req.body.postcontent , postauthorid : req.session.userid });
     newPost.save( (err) =>{
        if (err) return console.error(err);
        res.redirect('/home');
      });

    console.log(req.body);
});

module.exports = router;



