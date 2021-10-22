const mongoose = require("mongoose");

//connection to database
mongoose.connect(config.mongodb.connectionString)
    .then(db => console.log("DB connected"))
    .catch(err => console.log(err));
