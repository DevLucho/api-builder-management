const OrderModel = require('../models/Order');

function createOrder(req, res) {
    const body = req.body;
    OrderModel.create(body, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al crear solicitud' });
        } else {
            res.status(200).send({ status: true, message: 'Solicitud creada exitósamente' });
        }
    });
}

module.exports = {
    createOrder
}