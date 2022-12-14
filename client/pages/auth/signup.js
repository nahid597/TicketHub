import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const {doRequest, errors} = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      name,
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    doRequest();
   
  };

  const onClickSingIn = (e) => {
    e.preventDefault();
    Router.push("/auth/signin");
  };

  return (
    <div className="center-content">
      <div className="card" style={{ width: "40rem" }}>
      <h2 className="text-info text-center mb-3 mt-3">Create Account</h2>
      {errors}
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="font-weight-bold">
                Name
              </label>
              <input
                id="name"
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="font-weight-bold">
                Email Address
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <small id="email" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
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
                <button className="btn btn-primary">Sign up</button>
              </div>
              <div className="col col-md-8 text-center">
                <span>Already have an Account? </span>
                <button
                  onClick={(e) => onClickSingIn(e)}
                  className="btn btn-success">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
