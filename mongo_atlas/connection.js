const mongoose = require('mongoose')

const ConnectionDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('conneted to mongoDB atlas...');
    })
}
module.exports = ConnectionDB;