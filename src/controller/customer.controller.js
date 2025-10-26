import CustomerModel from '../models/customer.model.js';

export const createCustomer = async (req, res, next) => {
    try {
        const customer = await CustomerModel.create(req.body);
        res.status(201).send(customer);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const getAllCustomer = async (req, res, next) => {
    try {
        const region = await CustomerModel.find(req.body);
        res.status(200).send(region);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await CustomerModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        await CustomerModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


