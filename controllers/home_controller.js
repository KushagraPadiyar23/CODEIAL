const Post=require('../models/post');
const User=require('../models/user');
const { post } = require('../routes');
module.exports.home=function(req,res){
   // return res.end('<h1>Express is up for CODEIAL</h1>');
  /* Post.find({},function(err,posts){
    return res.render('home',{
        title:"Codeila|Home",
        posts: posts
   });
    
    });*/
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
        //console.log(posts[0].comments);
        User.find({},function(err,users){
            return res.render('home',{
                title:"Codeial|Home",
                posts: posts,
                all_users:users
        });      
    }) ;
});
}
module.exports.posts=function(req,res){
    return res.end('<h1>you have not posted anything yet</h1>');
}
