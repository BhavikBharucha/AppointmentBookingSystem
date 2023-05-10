const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017',{
        dbName: 'hospitaldb'
    }).then(()=>{
        console.log("MongoDB Connected....");
    }).catch((err)=>console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log("Database Connected!!");
    });

    mongoose.connection.on('error', (err) => console.log(err.message));
};