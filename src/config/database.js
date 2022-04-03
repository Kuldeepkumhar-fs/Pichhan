const mongoose = require('mongoose')

const connectToDatabase = () => {
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then((data) => {
        console.log(`MongoDB is connected with server ${data.connection.host}`);
        console.log('process.env.DB_URL   =====    ',process.env.DB_URL)
    }).catch((err) => {
        console.log("Error while connecting to mongoDB  ==  ", err);
    })
}

module.exports = connectToDatabase