const MongoClient = require('mongodb').MongoClient;
const mUrl = "mongodb://localhost:27017/Chokhty";

MongoClient.connect(mUrl,(err,result)=>{
    console.log(err)
    console.log(result)
})



// const MongoClient = require('mongodb').MongoClient;
// const mUrl = "mongodb://localhost:27017/Chokhty";
// var mydb;
// MongoClient.connect(mUrl,(err,result)=>{
//     // console.log("veer")
    
//     if(err){
//         console.log(err)
//     }else{
//         mydb=result;
//         var table=mydb.collection('tablename');
//         table.insertOne({name:"veer"},(err,res)=>{
//             console.log()
//         })
//     }
// })
