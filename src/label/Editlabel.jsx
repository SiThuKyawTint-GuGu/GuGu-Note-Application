import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ax from "../ax";
import Spinner from "../components/Spinner";
import MessageContext from "../context/MessageContext";
import Master from "../pages/layouts/Master";
const Editlabel = () => {
  const { id } = useParams();
  const [name, setname] = useState('');
  const [ctid, setctid] = useState('');
  const [pageloader, setpageloader] = useState(false);
  const [loader, setloader] = useState(false);
  const Mgcontext = useContext(MessageContext);
  const navigate = useNavigate();
  useEffect(() => {
    setpageloader(true);
    const token = localStorage.getItem('token');
    const obj = {
      id : id
    }
    ax.post("searchcategory", obj, {
      headers: { Authorization: "Bearer " + token },
    }).then(res => {
      setpageloader(false)
      console.log(res.data.data[0].name);
      setname(res.data.data[0].name);
      setctid(res.data.data[0].id);
    })
  }, [])
  

  const categoryupdate = () => {
    setloader(true);
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('id',ctid)
    ax.post("/updatecategory", formdata, {
      headers: { Authorization: "Bearer " + token },
    }).then(res => {
      setloader(false)
      Mgcontext.setmessage({ type: 'success', message: 'You are Successfully Update!' })
      navigate('/label')
    })
  }
 
  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3 mt-5">
            {pageloader ? (
              <Spinner />
            ) : (
              <>
                <div className="card">
                  <div className="p-3">
                    <div className="form-group">
                      <label htmlFor className="text-white mb-2">
                        Update Label
                      </label>
                      <input
                        type="text"
                        className={`form-control bg-white text-black mb-1`}
                        placeholder="enter your email"
                        onChange={(e) => setname(e.target.value)}
                        value={name}
                      />
                    </div>
                    <button
                      type="submit"
                      defaultValue="Login"
                      className="btn btn-success"
                      onClick={() => categoryupdate()}
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
                      Update
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Master>
  );
};

export default Editlabel;
