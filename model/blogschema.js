const mongoose = require('mongoose');
//Schema
const blogSchema = new mongoose.Schema({
    posttitle : String ,
    postcontent : String,
    postauthorid : String
  });


  module.exports= blogSchema;