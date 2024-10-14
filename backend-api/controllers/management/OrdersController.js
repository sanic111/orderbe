import Orders from '../../models/Orders.js';
import OrderDetails from '../../models/OrderDetails.js';
import CarColors from '../../models/CarColors.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            include: ['orderDetails', 'car']
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const orders = await Orders.findByPk(req.params.id, {
            include: ['orderDetails', 'car']
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
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updated = await Orders.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrder = await Orders.findByPk(req.params.id);
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Orders not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};