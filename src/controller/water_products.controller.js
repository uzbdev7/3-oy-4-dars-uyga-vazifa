import WaterModel from '../models/water_products.model.js';

export const createWaterPro = async (req, res, next) => {
    try {
        const water = await WaterModel.create(req.body);
        res.status(201).send(water);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const water = await WaterModel.find();
        res.status(200).send(water);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateWaterPro = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await WaterModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteWaterPro = async (req, res, next) => {
    try {
        const { id } = req.params;
        await WaterModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
