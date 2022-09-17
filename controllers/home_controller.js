module.exports.home=function(req,res){
    return res.end('<h1>Express is up for CODEIAL</h1>');
}
module.exports.posts=function(req,res){
    return res.end('<h1>you haven not posted anything yet</h1>');
}