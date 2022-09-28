const express = require('express');
const Auth = require('../middleware/Auth');
const { celebrate, Joi } = require('celebrate');
const OrderController = require('../controllers/OrderController');
const OrderCommand = require('../command/OrderCommand');
const api = express.Router();

api.post('/create', celebrate({
    body: Joi.object().keys({
        id_user: Joi.string().required(),
        id_type_order: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    }).unknown()
}), OrderController.createOrder);

api.get('/consult/date-end-project', OrderController.consultDateEndProject);
api.get('/command/update-status-pending', OrderCommand.updateStateOrderPending);
api.get('/command/update-status-end', OrderCommand.updateStateOrderFinished);
api.get('/export/:status', OrderController.exportData);

module.exports = api