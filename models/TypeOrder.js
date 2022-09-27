const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeOrder = Schema({
    name: String,
    construction_days: Number,
    material: Object,
});

module.exports = mongoose.model('type_orders', TypeOrder);
 