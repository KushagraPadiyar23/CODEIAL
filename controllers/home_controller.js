module.exports.home=function(req,res){
   // return res.end('<h1>Express is up for CODEIAL</h1>');
    return res.render('home',{
        title:"Home"
    });
}
module.exports.posts=function(req,res){
    return res.end('<h1>you haven not posted anything yet</h1>');
}

