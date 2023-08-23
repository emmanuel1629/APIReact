//coleccion bd

import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/API', 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    
})
    .then(db=>console.log('conectado'))
    .catch(error=>console.log(error))