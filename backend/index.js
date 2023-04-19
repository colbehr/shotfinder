require('dotenv').config()

const express = require('express');
// const mongoose = require('mongoose');
const db = require("./db");

const app = express();
//connection from db
db.connect(app);


//accept json
app.use(express.json())

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/uploads', express.static('uploads'));




/**
 * /frames REST API route 
 */
const framesRouter = require('./routes/frames')
app.use('/frames', framesRouter)

/**
 * /tags REST API route 
 */
const tagsRouter = require('./routes/tags')

app.use('/tags', tagsRouter.router)

/**
 * default route 
 */
app.get('/', (req, res) => {
    res.send('Shotfinder API')
})


app.listen(3001, () => console.log('App is listening on port 3001.'), console.log('http://localhost:3001'));