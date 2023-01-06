import React, { useEffect, useState } from "react";
import ax from "../../ax";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Master from "../layouts/Master";
import MessageContext from "../../context/MessageContext";

const Register = () => {
  const [name, setname] = useState([]);
  const [email, setemail] = useState([]);
  const [password, setpassword] = useState([]);
  const [error, setError] = useState({});
  const [loader, setloader] = useState(false);

  //Context
  const Authusercontext = React.useContext(AuthContext);
  const MgContext = React.useContext(MessageContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      MgContext.setmessage({
        type: "error",
        message: "You are already login!",
      });
      navigate("/");
    }
  }, []);

  const login = (e) => {
    setloader(true);
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);

    ax.post("/user/registerapi", formdata).then((response) => {
      setloader(false);
      console.log(response.data.success);
      console.log(response.data.data);

      if (response.data.success === "false") {
        setError(response.data.data);
        MgContext.setmessage({
          type: "error",
          message: `Sorry ${response.data.user.name}`,
        });
      } else {
        localStorage.setItem("token", response.data.token);
        Authusercontext.setAuthuser(response.data.user);
        MgContext.setmessage({
          type: "success",
          message: `Welcome ${response.data.user.name}`,
        });
        navigate("/");
      }
    });
  };

  return (
    <Master>
      <div className="container mt-3 mb-4">
        <div className="row">
          {/* For Category and Information */}
          <div className="col-md-6 offset-3 mt-5">
            <div className="card">
              <div className="card-header bg-dark">
                <h5 className="text-white p-1">Register</h5>
              </div>
              <div className="card-body">
                <div className="p-3">
                  <div className="form-group ">
                    <label htmlFor className="text-white mb-1">
                      Enter Username
                    </label>
                    <input
                      type="text"
                      className={`form-control bg-white  text-black mb-1 ${
                        error.name && "border border-danger"
                      } `}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="enter your name"
                    />
                    {error.name && (
                      <small className="text-danger text-sm">
                        {error.name}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor className="text-white my-1">
                      Enter Email
                    </label>
                    <input
                      type="email"
                      className={`form-control bg-white  text-black mb-1 ${
                        error.email && "border border-danger"
                      } `}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="enter your email"
                    />
                    {error.email && (
                      <small className="text-danger text-sm">
                        {error.email}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor className="text-white my-1">
                      Enter Password
                    </label>
                    <input
                      type="password"
                      className={`form-control bg-white  text-black mb-1 ${
                        error.password && "border border-danger"
                      } `}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder="*****"
                    />
                    {error.password && (
                      <small className="text-danger text-sm">
                        {error.password}
                      </small>
                    )}
                  </div>

                  <button
                    disabled={loader}
                    type="submit"
                    defaultValue="Register"
                    className="btn btn-dark mt-1"
                    onClick={() => login()}
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
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default Register;
