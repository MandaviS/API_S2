const mongoose = require('mongoose');
const connection = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/apidatabase");
       console.log("Database successfully connected");
      } catch(error) {
        console.log(error);
     }

};

module.exports = connection;