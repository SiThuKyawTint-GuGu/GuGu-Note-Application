import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ax from "../ax";
import MessageContext from "../context/MessageContext";
import Master from "../pages/layouts/Master";
const Createlabel = () => {
  const [label, setlabel] = useState('');
  const [loader, setloader] = useState(false);
  const [error, seterror] = useState([]);
  const navigate = useNavigate();
  const Mgcontext = useContext(MessageContext);

  const createcategory = () => {
    setloader(true)
    const formdata = new FormData();
    formdata.append('name', label);
    const token = localStorage.getItem('token');
    ax.post("/createcategory", formdata, {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      console.log(res.data)
     if(res.data.success === 'false'){
       setloader(false);
       seterror(res.data)
     } else {
         setloader(false);
         Mgcontext.setmessage({
           type: "success",
           message: "You are successfully Create!",
         });
        navigate("/label");
      }
    })
  }
  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3 mt-5">
            <div className="card">
              <div className="p-3">
                <div className="form-group">
                  <label htmlFor className="text-white mb-2">
                    Enter Label
                  </label>
                  <input
                    type="text"
                    className={`form-control bg-white text-black mb-1 ${error.name ? 'border-danger':''}`}
                    onChange={(e) => setlabel(e.target.value)}
                    placeholder="enter Label"
                  />
                  {
                    error.name && <small className="text-sm text-danger">{ error.name}</small>
                  }
                </div>
                <button
                  type="submit"
                  defaultValue="Login"
                  className="btn btn-dark"
                  onClick={() => createcategory()}
                >
                  {loader ? (
                    <div
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    ""
                  )}
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default Createlabel;
