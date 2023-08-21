require('dotenv').config()

const express = require('express');
// const mongoose = require('mongoose');
const db = require("./util/DatabaseConnect.js");
const app = express();
const cookieParser = require("cookie-parser");

//connection from db
db.connect(app);

//accept json
app.use(express.json())


app.use(cookieParser());

app.use((req, res, next) => {
    // https://50linesofco.de/post/2017-03-06-cors-a-guided-tour
    // var origin = req.headers.origin; 
    const ALLOWED_ORIGINS = [
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://192.168.1.119:3000'
    ]
    // console.log(req.headers.origin);
    if(ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
        res.set('Access-Control-Allow-Credentials', 'true')
        res.set('Access-Control-Allow-Origin', req.headers.origin)
    } else { // allow other origins to make unauthenticated CORS requests
        res.set('Access-Control-Allow-Origin', '*')        
    }
    // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});



/**
 * default get route 
 */
app.get('/', (req, res) => {
    res.send('Shotfinder API <a href="https://github.com/colbehr/shotfinder/wiki"> <pre>https://github.com/colbehr/shotfinder/wiki</pre></a>')
})

app.use('/uploads', express.static('uploads'));


/**
 * /signup REST API route 
 */
const signupRouter = require('./routes/signup')
app.use('/signup', signupRouter)


/**
 * /login REST API route 
 */
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

/**
 * /userVerification REST API route 
 */
const userVerificationRouter = require('./routes/userVerification.js')
app.use('/userVerification', userVerificationRouter)

/**
 * /user REST API route 
 */
const userRouter = require('./routes/user')
app.use('/user', userRouter)



/**
 * /frames REST API route 
 */
const framesRouter = require('./routes/frames')
app.use('/frames', framesRouter)

/**
 * /tags REST API route 
 */
const tagsRouter = require('./routes/tags');
app.use('/tags', tagsRouter.router)

// function (req, res, next){
//     if(userVerification(req, res) !== false){
//         next()
//     } else{
//         res.json("Please sign up or log in")
//     }
// }

app.listen(3001, () => console.log('App is listening on port 3001.'), console.log('http://localhost:3001'));