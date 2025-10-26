import PaymentModel from '../models/payments.model.js';

export const createPayment = async (req, res, next) => {
    try {
        const order = await PaymentModel.create(req.body);
        res.status(201).send(order);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const getAllPayment = async (req, res, next) => {
    try {
        const payment = await PaymentModel.find(req.body);
        res.status(200).send(payment);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updatePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await PaymentModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        await PaymentModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
