import { model, Schema } from 'mongoose';

const regionSchema = new Schema(
    {
        name: String,
        address: String,
        location: String,
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: 'customer',
            required: true,
        },
        district_id: {
            type: Schema.Types.ObjectId,
            ref: 'district',
            required: true,
        },
    },
    { timestamps: true }
);

const RegionModel = model('region', regionSchema);

export default RegionModel;
