const User=require('../models/user');
module.exports.profile=function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',
        {
            title:"Profile page",
            profile_user: user
    });
    });  
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.contact=function(req,res){
    res.end('<h1>9193346164</h1>');
}
//render the sign up page
module.exports.signUp=function(req,res){
   if(req.isAuthenticated())
   {
    return res.redirect('/users/profile');
   }
   
    return res.render('user_sign_up',{
        title:"Codeial|SignUp"
    });
}
//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
   {
    return res.redirect('/users/profile');
   }
    return res.render('user_sign_in',{
        title:"Codeial|SignIn"
    });
}
//render the signup data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('error in finding user while signing up');
            return;
        }

        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log("error in creating user ehile signing up");
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            //if user already exists
            return res.redirect('back');
        }

    });
}
//sign in and create the session for the user
module.exports.createSession=function(req,res){
    req.flash('Success','Logged In Successfully!');
    return res.redirect('/'); //redirecting to profile page
}

//for signing/logging out
module.exports.destroySession=function(req,res){
   // req.logout(); //this function is given to request using passport.js
   req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('Success','You have Logged Out Successfully!');
    return res.redirect('/');
  });
    //return res.redirect('/');
}
