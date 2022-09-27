const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    roles: Array,
    status: { type: Boolean, default: true }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('users', User);