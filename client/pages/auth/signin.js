import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    doRequest();
  };

  const onClickNewAccount = (e) => {
    e.preventDefault();
    Router.push("/auth/signup");
  };

  return (
    <div className="center-content">
      <div className="card" style={{ width: "40rem" }}>
        <h2 className="text-info text-center mb-3 mt-3">
          Already have an Account ??
        </h2>
        {errors}
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="font-weight-bold">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="font-weight-bold">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className="form-group mt-3 row">
              <div className="col col-md-4">
                <button className="btn btn-primary">Log in</button>
              </div>
              <div className="col col-md-8 text-center">
                <span>Don't have an Account? </span>
                <button
                  onClick={(e) => onClickNewAccount(e)}
                  className="btn btn-success">
                  Create New Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
