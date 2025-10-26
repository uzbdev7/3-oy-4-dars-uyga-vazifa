import Order_itemsModel from '../models/order_items.model.js';

export const createOrderItem = async (req, res, next) => {
    try {
        const order_item = await Order_itemsModel.create(req.body);
        res.status(201).send(order_item);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const getAllOrderItem = async (req, res, next) => {
    try {
        const order_item = await Order_itemsModel.find(req.body);
        res.status(200).send(order_item);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateOrderItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log('Body:', req.body);

        const updated = await Order_itemsModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updated) {
            return res.status(404).send({ message: 'Order item not found' });
        }

        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteOrderItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Order_itemsModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

