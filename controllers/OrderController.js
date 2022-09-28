'use strict'
const OrderModel = require('../models/Order');
const TypeOrderModel = require('../models/TypeOrder');
const MaterialModel = require('../models/Material');
const UserModel = require('../models/User');
const DataExporter = require('json2csv').Parser;

function createOrder(req, res) {
    UserModel.findById(req.body.id_user, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo consultando el usuario' });
        } else {
            if (data.roles.includes("Arquitecto")) {
                const checkCoordinate = OrderModel.find({'latitude': req.body.latitude, 'longitude': req.body.longitude});
                if (checkCoordinate.length > 0) {
                    res.status(200).send({ status: false, message: 'Ya existe una orden con las coordenadas dadas' });
                } else {
                    TypeOrderModel.findById(req.body.id_type_order, (err, data) => {
                        if (err) {
                            res.status(200).send({ status: false, message: 'No existe el tipo de construcción' });
                        } else {
                            isAvail(data).then(value => {
                                if (value) {
                                    orderStartAndEnd(req.body, data.construction_days).then(obj => {
                                        OrderModel.create(obj, (err2, data2) => {
                                            if (err2) {
                                                res.status(200).send({ status: false, message: 'Fallo al crear solicitud' });
                                            } else {
                                                updateMaterial(data);
                                                res.status(200).send({ status: true, message: 'Solicitud creada exitósamente' });
                                            }
                                        });
                                    });
                                } else {
                                    res.status(200).send({ status: false, message: 'No hay suficiente stock en los materiales' });
                                }
                            })
                        }
                    });
                }
            } else {
                res.status(200).send({ status: false, message: 'No tiene permisos para crear solicitudes' });
            }
        }
    });
}

// check materials stock
async function isAvail(data) {
    for (let key in data.material) {
        let material = await MaterialModel.findOne({code: key}).exec();
        let stockAvail = material.stock - data.material[key];
        if (stockAvail < 0) {
            return false;
        }
    }
    return true;
}

// update materials stock after create order
async function updateMaterial(data) {
    for (let key in data.material) {
        const material = await MaterialModel.findOne({code: key});
        MaterialModel.findOneAndUpdate({code: key}, {stock: material.stock - data.material[key]}, (err, data2) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }
}

// schedule the order date linearly
async function orderStartAndEnd(data, days) {
    const lastOrder = await OrderModel.findOne().sort({'_id': -1});
    if (lastOrder !== null) {
        data.date_start = sumDays(new Date(lastOrder.date_end), 1);
    } else {
        data.date_start = sumDays(new Date(), 1);
    }
    data.date_end = sumDays(new Date(data.date_start), days);
    return data;
}

function sumDays(date, days) {
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0];
}

async function consultDateEndProject(req, res) {
    const lastOrder = await OrderModel.findOne().sort({'_id': -1});
    if (lastOrder !== null) {
        res.status(200).send({ status: true, data: lastOrder.date_end.toISOString().split('T')[0] });
    } else {
        res.status(200).send({ status: false, message: 'Fallo consultando fecha fin del proyecto' });
    }
}

// report count for type order
async function exportData(req, res) {
    const orders = await OrderModel.find({status: req.params.status}).count();
    let data_bd = JSON.parse(JSON.stringify({"Estado": req.params.status, "Cantidad": orders}));
    // convert JSON to CSV Data
    let json_data = new DataExporter("Cantidad");
    let csv_data = json_data.parse(data_bd);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=data.csv");
    res.status(200).end(csv_data);
}

module.exports = {
    createOrder,
    consultDateEndProject,
    exportData
}