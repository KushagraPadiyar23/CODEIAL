const { default: mongoose } = require('mongoose');
const mongoosee=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    //comment belongs to a user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //comments also belongs to post
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{
    timestamps: true
});

const Comment= mongoose.model("Comment", commentSchema);
module.exports=Comment;