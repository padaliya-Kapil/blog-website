//This is a monolith code I want to organize it
const express = require("express");
const session = require('express-session');

const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const databasename = "blogdb";

const app = express();

const postrouter = require(__dirname+'/routes/posts');
const userrouter = require(__dirname+'/routes/user');


app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(postrouter);
app.use(userrouter);

app.use(session({secret: 'ssshhhhh',
resave: true,
saveUninitialized: true
}));


//connection to db
mongoose.connect('mongodb://localhost/' + databasename, {useNewUrlParser: true,  useUnifiedTopology: true });

// check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Db connected!");
});

app.get('/',(req,res)=>{
  res.render('signup');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })