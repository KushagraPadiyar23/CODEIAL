const Post=require('../models/post');
const { post } = require('../routes');
module.exports.home=function(req,res){
   // return res.end('<h1>Express is up for CODEIAL</h1>');
  /* Post.find({},function(err,posts){
    return res.render('home',{
        title:"Codeila|Home",
        posts: posts
   });
    
    });*/
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Codeial|Home",
            posts: posts
       });
    })  
}
module.exports.posts=function(req,res){
    return res.end('<h1>you haven not posted anything yet</h1>');
}

