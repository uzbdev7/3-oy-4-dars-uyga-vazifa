import districtModel from '../models/district.model.js';

export const createDistrict = async (req, res, next) => {
    try {
        const district = await districtModel.create(req.body);
        res.status(201).send(district);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllDistrict = async (req, res, next) => {
    try {
        const district = await districtModel.find(req.body);
        res.status(200).send(district);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateDistrict = async (req, res, next) => {
    try {
        const { id } = req.params;
        const district = await districtModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).send(district);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteDistrict = async (req, res, next) => {
    try {
        const { id } = req.params;
        await districtModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


