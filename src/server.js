const dotenv = require('dotenv')
const app = require('./app')
const connectToDatabase = require('./config/database')



// handling uncaught exceptions error eg. if any variable is not defined ...etc
process.on('uncaughtException',(err)=>{

    console.log("uncaughtException Error occured  ====   ", err)
    console.log('Shutting down the server due to uncaughtException Error ..........')

})

dotenv.config({path:'./src/config/config.env'})
connectToDatabase()



const server = app.listen(process.env.PORT, () => {
    console.log('Server started successfully.',process.env.PORT);
})


// unhandled promise rejection error handling......  eg:. if database connection string or url gets damaged.
process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection Error occured  ====   ", err)
    // console.log('Shutting down the server..........')

    // server.close(() => {
    //     process.exit(1);
    // })
})



