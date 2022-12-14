const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require("./config/mongoose");
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore =require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/custommiddleware');

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/CSS",
    debug:true,
    outputStyle:'extended',
    prefix:"/CSS"
}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));
app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine

app.set('view engine','ejs');
app.set('views','./views');
//Mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Codeial',
    //TODO:to change the secret before deployement in production
    secret:'blahsomething',  //key for encrypting the cookie
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl : "mongodb://0.0.0.0:27017/codeial_development",
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||"connect mondo-db setup okay");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err)
        console.log(`error in running the server on port: ${err}`);

     console.log(`server up and ruuning on port: ${port}`);   
});