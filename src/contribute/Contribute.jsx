import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ax from "../ax";
import MessageContext from "../context/MessageContext";
import Master from "../pages/layouts/Master";

const Contribute = () => {
  const [email, setemail] = useState("");
  const [loader, setloader] = useState(false);
  const [condition, setcondition] = useState(false);
  const [state, setstate] = useState(false);
  const [cid, setcid] = useState("");
  const { id } = useParams();
  const [finalloader, setfinalloader] = useState(false);
  const Mgcontext = useContext(MessageContext);

  const searchemail = () => {
    setloader(true);
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("email", email);
    ax.post("/searchemail", formdata, {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      setloader(false);
      if (isNaN(res.data.data)) {
        setcid(res.data.data[0].id);
        setcondition(true);
        Mgcontext.setmessage({ type: "success", message: "User Found!" });
      } else {
        setcondition(false);
        Mgcontext.setmessage({
          type: "error",
          message: "User Not Found!",
        });
        console.log("ma shi");
      }
    });
  };

    const contributenote = () => {
        setfinalloader(true);
    const obj = {
      id: id,
      contributed_id: cid,
    };
    const token = localStorage.getItem("token");
    ax.post("/createcontribute", obj, {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        setstate(true);
        setfinalloader(false);
    });
  };
  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4 mt-5">
            <div className="card rounded-3 overflow-hidden">
              <div className="">
                <div className="form-group">
                  <div className="bg-white p-2">
                    <label htmlFor className="text-white mb-2 text-dark ">
                      Contribute Form
                    </label>
                  </div>
                  <div className="p-2 mt-2">
                    <label htmlFor="" className="text-white">
                      Enter Email
                    </label>
                    <input
                      type="email"
                      className={`form-control bg-white text-black `}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Enter email"
                    />
                    <div className="ps-2 mt-3">
                      <button
                        type="submit"
                        defaultValue="Login"
                        className="btn btn-danger"
                        onClick={() => searchemail()}
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
                        Search
                      </button>
                      {condition ? (
                        <div className="mt-5">
                          <div className="p-3 bg-danger">
                            <h6 className="text-center text-white">
                              {email} Found!
                            </h6>
                            <button
                              disabled={state}
                              onClick={() => contributenote()}
                              className="btn btn-success w-100"
                            >
                              {finalloader ? (
                                <div
                                  class="spinner-border spinner-border-sm me-2"
                                  role="status"
                                >
                                  <span class="sr-only">Loading...</span>
                                </div>
                              ) : (
                                ""
                              )}
                              Contribute
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default Contribute;
