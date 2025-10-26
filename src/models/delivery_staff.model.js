import { model, Schema } from 'mongoose';

const delivery_staffSchema = new Schema(
    {
        name: String,
        phone: Number,
        vehicle_number: Number,
        district_id: {
            type: Schema.Types.ObjectId,
            ref: 'district',
            required: true,
        },
    },
    { timestamps: true }
);

const delivery_staffModel = model('delivery_staff', delivery_staffSchema);

export default delivery_staffModel;
