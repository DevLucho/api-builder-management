const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('db conected'));

async function connectDb({host, port, dbName}){
    const uri = `mongodb://${host}:${port}/${dbName}`;
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.error('Fallo conexion con DB:', error.message);       
    }
}

module.exports = connectDb;