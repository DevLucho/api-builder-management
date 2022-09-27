const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Material = Schema({
    code: String,
    name: String,
    stock: Number,
});

module.exports = mongoose.model('materials', Material);
 