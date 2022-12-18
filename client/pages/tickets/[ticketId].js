import Router from "next/router";
import useRequest from "../../hooks/use-request";

const showTicket = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });

  return (
    <div>
      <h1>Showing Ticket Details</h1>
      <br />
      <h2>{ticket.title}</h2>
      <h3>Price: {ticket.price}</h3>
      <button onClick={doRequest} className="btn btn-primary">
        Purchase
      </button>
      {errors}
    </div>
  );
};

showTicket.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default showTicket;
