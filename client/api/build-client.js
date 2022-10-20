import axios from "axios";
import config from "../config";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // this is server side
    // general calling approach for other service in cluster
    // http://service-name.namesapce-name.svc.cluster.local

    return axios.create({
      baseURL: `http://${config.ingress_nginx_controller}`,
      headers: req.headers
    });
  } else {
    // this this client side
    return axios.create({
      baseURL: `/`,
    });
  }
};
