import OrdersModel from '../models/orders.model.js';

export const createOrder = async (req, res, next) => {
    try {
        const order = await OrdersModel.create(req.body);
        res.status(201).send(order);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const getAllOrder = async (req, res, next) => {
    try {
        const order = await OrdersModel.find(req.body);
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await OrdersModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await OrdersModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
