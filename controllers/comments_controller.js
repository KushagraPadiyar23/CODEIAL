const Comment=require("../models/comment");
const Post=require("../models/post");

module.exports.create=async function(req,res){
    //console.log(req.user);
    try{
        let post=await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                post.comments.push(comment);
                post.save();
                req.flash('Success','Comment added successfully');
                res.redirect('/');

            }
            else{
                req.flash('error','you cannot add comment');
                return res.redirect('back');
            }
        }
    catch(err){
        req.flash("Error",err);
        return res.redirect('back');
    }
} 
    


module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user=req.user.id){
            let postId=comment.post;
            comment.remove();
            let post=Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
                req.flash('Success','Comment deleted successfully');
                return res.redirect('back');
            }
        else{
            req.flash('error','you cannot delete comment');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash("Error",err);
        return res.redirect('back');
    }
    
    }
