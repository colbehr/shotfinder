require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const db = require("./db");

const app = express();
//connection from db
db.connect(app);
//accept json
app.use(express.json())

const framesRouter = require('./routes/frames')
app.use('/frames', framesRouter)



app.listen(3001, () => console.log('App is listening on port 3001.'), console.log('http://localhost:3001'));