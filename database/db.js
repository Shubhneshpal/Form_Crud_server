const mongoose = require('mongoose');

const Connection = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/FormData')
        console.log('database connected successfully')
    }
    catch(error){
        console.log('Error while conecting with database')
    }
}

module.exports = Connection;