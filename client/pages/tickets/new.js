import Router from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";


const CreateNewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        body : {
            title,
            price
        },
        onSuccess: (ticket) => Router.push('/')
    });

    const onBlur = () => {
        const value = parseFloat(price);

        if(isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        doRequest();
    }


    return (
        <div className="center-content">
          <div className="card" style={{ width: "40rem" }}>
            <h2 className="text-info text-center mb-3 mt-3">
             Create a New Ticket
            </h2>
           {errors}
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Title
                  </label>
                  <input
                    id="title"
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the Title"
                  />
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    Price
                  </label>
                  <input
                    id="price"
                    className="form-control"
                    type="text"
                    onBlur={onBlur}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter the price Ex. 12.43"
                  />
                </div>
                <div className="form-group mt-3 row">
                  <div className="col col-md-4">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
};

export default CreateNewTicket;