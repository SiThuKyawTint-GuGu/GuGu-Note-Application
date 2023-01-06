import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ax from '../../ax'
import AuthContext from '../../context/AuthContext'
import MessageContext from '../../context/MessageContext'
import Master from '../layouts/Master'

const Login = () => {
  const [email, setemail] = useState({})
  const [password, setpassword] = useState({})
  const [error, seterror] = useState({});
  const [loader, setloader] = useState(false);
 
  //Context
    const Authusercontext = React.useContext(AuthContext);
    const MgContext = React.useContext(MessageContext);
    const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      MgContext.setmessage({ type: 'error', message: 'You are already login!' });
      navigate('/');
    }
  },[])
  
  const login = () => {
    setloader(true)
     const formdata = new FormData();
     formdata.append("email", email);
     formdata.append("password", password);

    ax.post("/user/login", formdata).then((response) => {
      setloader(false);   
      if (response.data.success === 'false') {
        seterror(response.data.data)
      } else {
         localStorage.setItem("token", response.data.token);
         Authusercontext.setAuthuser(response.data.user);
         MgContext.setmessage({
           type: "success",
           message: `Welcome Back ${response.data.user.name}`,
         });
         navigate("/");
   }
  });
  }

  return (
    <Master>
      <div className="container mt-3">
        <div className="row">
          {/* For Category and Information */}
          <div className="col-md-6 offset-3 App-header mt-5 mb-4">
            <div className="card">
              <div className="card-header bg-dark">
                <h5 className="text-white p-1">Login</h5>
              </div>
              <div className="card-body">
                <div className="p-3">
                  <div className="form-group">
                    <label htmlFor className="text-white mb-2">
                      Enter Email
                    </label>
                    <input
                      type="email"
                      className={`form-control bg-white text-black mb-1 ${
                        error.email && "border border-danger"
                      }  `}
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
                    <label htmlFor className="text-white mb-2">
                      Enter Password
                    </label>
                    <input
                      type="password"
                      className={`form-control bg-white text-black mb-1 ${
                        error.password && "border border-danger"
                      }  `}
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
                    defaultValue="Login"
                    className="btn btn-dark"
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
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default Login