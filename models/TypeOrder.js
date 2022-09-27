const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeOrder = Schema({
    name: String,
    description: String,
    construction_days: Number,
    material: Array,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('type_orders', TypeOrder);
 