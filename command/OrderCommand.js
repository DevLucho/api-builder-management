const OrderModel = require('../models/Order');

async function updateStateOrderPending(req, res) {
    let ordersPending = await OrderModel.find({status: 'pendiente', date_start: new Date().toISOString().split('T')[0]});
    for (let i = 0; i < ordersPending.length; i++) {
        OrderModel.findOneAndUpdate({_id: ordersPending[i]._id}, {
            $set: {
                updated_at: new Date(),
                status: 'en proceso'
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
            }
        });
    }
    res.status(200).send({ status: true, message: 'Actualizacion realizada' });
}

async function updateStateOrderFinished(req, res) {
    let ordersInProccess = await OrderModel.find({status: 'en proceso', date_end: new Date().toISOString().split('T')[0]});
    for (let i = 0; i < ordersInProccess.length; i++) {
        OrderModel.findOneAndUpdate({_id: ordersInProccess[i]._id}, {
            $set: {
                updated_at: new Date(),
                status: 'finalizado'
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
            }
        });
    }
    res.status(200).send({ status: true, message: 'Actualizacion realizada' });
}

module.exports = {
    updateStateOrderPending,
    updateStateOrderFinished
}