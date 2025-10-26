import RegionModel from '../models/region.model.js';

export const createRegion = async (req, res, next) => {
    try {
        const region = await RegionModel.create(req.body);
        res.status(201).send(region);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllRegion = async (req, res, next) => {
    try {
        const region = await RegionModel.find(req.body).populate([
            { path: 'customer_id', select: 'name phone' },
            { path: 'district_id', select: 'name' },
        ]);
        res.status(200).send(region);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateRegion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const register = await RegionModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).send(register);
    } catch (error) {
        console.log(error);
        next(error);
    }
};



export const deleteRegion = async (req, res, next) => {
    try {
        const { id } = req.params;
        await RegionModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
