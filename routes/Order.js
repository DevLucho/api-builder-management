const express = require('express');
const Auth = require('../middleware/Auth');
const { celebrate, Joi } = require('celebrate');
const OrderController = require('../controllers/OrderController');
const api = express.Router();

api.post('/create', celebrate({
    body: Joi.object().keys({
        id_type_order: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    }).unknown()
}), OrderController.createOrder);


module.exports = api