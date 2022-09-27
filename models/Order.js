const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = Schema({
    id_type_order: { type: Schema.ObjectId, ref: 'type_orders' },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    date_start: Date,
    date_end: Date,
    status: { type: String, default: 'pendiente'},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('orders', Order);
 