const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Material = Schema({
    code: String,
    name: String,
    stock: Number,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('materials', Material);
 