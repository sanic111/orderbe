import Orders from '../../models/Orders.js';
import OrderDetails from '../../models/OrderDetails.js';
import Customer from '../../models/Customer.js';
import Car from '../../models/Car.js';
import { Op } from 'sequelize';

import { generatePaginationLinks } from '../../helper/PagingHelper.js';

export const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const status = req.query.status;

        let whereClause = {};
        if (status) {
            whereClause.order_status = status;
        }

        const { count, rows: orders } = await Orders.findAndCountAll({
            where: whereClause,
            include: [
                { model: Customer, as: 'customer', attributes: ['id', 'fullname', 'email'] },
                { model: Car, as: 'car', attributes: ['id', 'model', 'brand'] },
                { model: OrderDetails, as: 'orderDetails' }
            ],
            limit,
            offset,
            orders: [['created_at', 'DESC']]
        });

        const totalPages = Math.ceil(count / limit);
        const paginationLinks = generatePaginationLinks(req, page, totalPages);

        res.status(200).json({
            orders,
            currentPage: page,
            totalPages,
            totalOrders: count,
            paginationLinks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const orders = await Orders.findByPk(req.params.id, {
            include: [
                { model: Customer, as: 'customer', attributes: ['id', 'fullname', 'email'] },
                { model: Car, as: 'car', attributes: ['id', 'model', 'brand'] },
                { model: OrderDetails, as: 'orderDetails' }
            ]
        });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: 'Orders not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const newOrder = await Orders.create(req.body);
        res.status(201).json({ success: true, orders: newOrder });
    } catch (error) {
        console.error('Error creating orders:', error);
        res.status(500).json({ success: false, message: 'Failed to create orders', error: error.message });
    }
};