const Post=require("../models/post");
const Comment=require("../models/comment");

module.exports.create=async function(req,res){
    try{
        let post=await Post.create(
            {
                content:req.body.content,
                user:req.user._id
            });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message: "Post created!"
                });
            }

            req.flash('Success','Post published!!');
            return res.redirect('back');
    }catch(err){
       req.flash("Error",err);
        return res.redirect('back');
    }
}

module.exports.destroy=async function(req,res){
   
   try{
    let post=await Post.findById(req.params.id); 
        //.id means converting the object id into string
        if(post.user==req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
                
            }
           req.flash('Success','Post and related comments deleted');
               return res.redirect('back');
            
        }else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');
        }
   }catch(err){
    req.flash("Error",err);
    return res.redirect('back');
   }   
}