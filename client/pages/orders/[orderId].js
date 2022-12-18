import { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';

const showOrder = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timeId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, [order]);

  if(timeLeft < 0) {
    return <div>Order Expired</div>
  }

  return (
    <div>
      <h1>Your order Details</h1>
      <div>Time left to pay {timeLeft} seconds</div>
      <StripeCheckout
        token={(token) => console.log(token)}
        stripeKey="pk_test_51MFdUJLkfDsQRhv4GK2L01TYeaw4T68T22S5CMH6fiBRSv02QQwSi1fcihGIxcT7oB5Ihlw6QptnyZ8a9QAv1cUC007RL5zmQs"
        amount={order.ticket.price * 100}
        email = {currentUser.email}
      />
    </div>
  );
};

showOrder.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default showOrder;
