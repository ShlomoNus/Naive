const express = require('express');

const cors = require('cors')

const fleets = require('./components/fleet/route');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors())

app.use(express.json());

app.use('/fleet',  fleets);


app.listen(80)