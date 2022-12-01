import config from "../config";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID not found");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID not found");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
        `http://${config.nats_srv}:4222`
      // using dns name
      // `http://nats-srv.default.svc.cluster-domain.example:4222`
    );

    natsWrapper.client.on("close", () => {
      console.log("Connection is close !!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();

    console.log('nats server connected successfully on expiration service');
    

  } catch (err) {
    console.log(err);
  }
};

start();
