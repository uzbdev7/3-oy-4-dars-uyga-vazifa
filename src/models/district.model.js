import { model, Schema } from 'mongoose';

const districtSchema = new Schema(
    {
        name: String,
    },
    { timestamps: true }
);

const districtModel = model('district', districtSchema);

export default districtModel;


