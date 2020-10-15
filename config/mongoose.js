const mongoose = require ('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/ClashofVillage', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    const db = mongoose.connection;
    db.on('error', (e) => console.log(e));
    db.once('open', () => console.log('Mongoose connection success!'));
}