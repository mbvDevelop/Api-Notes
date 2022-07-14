const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();
const dbPort = process.env.PORT || 3000;

const authRoute = require('./Server/app/api/routes/authRoutes');
const noteRoute = require('./Server/app/api/routes/notesRoutes')

mongoose.connect(
    process.env.DB_CONNECT || "mongodb://localhost:27017", 
    {useNewUrlParser: true},
    () => console.log('connected to db: ',  "mongodb://localhost:27017"));

app.use(express.json());

app.use('/api/v1/user', authRoute)
app.use('/api/v1/note', noteRoute)

app.listen(dbPort, () => console.log('Server listening port ' + dbPort))