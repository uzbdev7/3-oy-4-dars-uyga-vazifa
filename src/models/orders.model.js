import { model, Schema } from 'mongoose';

const ordersSchema = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: 'customer',
            required: true,
        },
        delivery_staff_id: {
            type: Schema.Types.ObjectId,
            ref: 'delivery_staff',
            required: true,
        },
        order_date: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['pending', 'delivered', 'cancelled'],
            required: true,
        },
    },
    { timestamps: true }
);

const OrdersModel = model('orders', ordersSchema);

export default OrdersModel;

