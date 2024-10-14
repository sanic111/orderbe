import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import OrderDetails from "./OrderDetails.js";


const Orders = db.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
    },
    car_id: {
        type: DataTypes.INTEGER,
    },
    payment_price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    total_price: {
        type: DataTypes.DECIMAL(15, 2),
    },
    sales_staff_id: {
        type: DataTypes.INTEGER,
    },
    technical_staff_id: {
        type: DataTypes.INTEGER,
    },
    insurance_staff_id: {
        type: DataTypes.INTEGER,
    },
    order_status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    },
    showroom_id: {
        type: DataTypes.INTEGER,
    },
    loan_id: {
        type: DataTypes.INTEGER,
    },
    discount_id: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
    {
        tableName: 'orders',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

Orders.hasMany(OrderDetails, {
    foreignKey: "order_id",
    as: "orderDetails",
});

OrderDetails.belongsTo(Orders, {
    foreignKey: "order_id",
    as: "orders",
});



export default Orders;