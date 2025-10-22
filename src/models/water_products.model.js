import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
    {
        name: String,
        volume_liters: Number,
        price: Number,
    },
    { timestamps: true }
);

const WaterModel = model('water_products', waterSchema);

export default WaterModel;
