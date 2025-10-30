import delivery_staffModel from '../models/delivery_staff.model.js';

export const getAllDelivery = async (req, res, next) => {
    try {
        const region = await delivery_staffModel
            .find(req.body)
            .populate([{ path: 'district_id', select: 'name' }]);
        res.status(200).send(region);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateDelivery = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await delivery_staffModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteDelivery = async (req, res, next) => {
    try {
        const { id } = req.params;
        await delivery_staffModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Deleted successfully!' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

