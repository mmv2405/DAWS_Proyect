const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dawsProyect')
.then (db =>  console.log('Database is up and running'))
.catch(err => console.error(err));