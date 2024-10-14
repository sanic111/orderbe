import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../axios';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orders, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await API.get(`orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="orders-confirmation">
      <h1>Đặt hàng thành công!</h1>
      <p>Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là: {orderId}</p>
      {orders && (
        <div className="orders-details">
          <h2>Chi tiết đơn hàng</h2>
          <p>Tổng tiền: {orders.total_amount}</p>
          <p>Trạng thái: {orders.status}</p>
          {/* Thêm các chi tiết khác của đơn hàng ở đây */}
        </div>
      )}
      <Link to="/" className="btn btn-primary">Quay lại trang chủ</Link>
    </div>
  );
};

export default OrderConfirmation;