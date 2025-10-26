import { model, Schema } from 'mongoose';

const order_itemsSchema = new Schema(
    {
        order_id: {
            type: Schema.Types.ObjectId,
            ref: 'orders',
            required: true,
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'water_products',
            required: true,
        },
        quantity: Number,
        total_price: Number,
    },
    { timestamps: true }
);

const Order_itemsModel = model('order_items', order_itemsSchema);

export default Order_itemsModel;
