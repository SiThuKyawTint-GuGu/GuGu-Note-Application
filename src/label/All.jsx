import React from "react";
import Master from "../pages/layouts/Master";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ax from "../ax";
import { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useContext } from "react";
import MessageContext from "../context/MessageContext";

const All = () => {
  const [label, setlabel] = useState([]);
  const [nextpage, setnextpage] = useState("");
    const [loader, setloader] = useState(false);
     const [moreloader, setmoreloader] = useState(false);
    const [pageloader, setpageloader] = useState(false);
    const Mgcontext = useContext(MessageContext);
    
  useEffect(() => {
    setpageloader(true);
    const token = localStorage.getItem("token");
    ax.get("/categoryagain", {
      headers: { Authorization: "Bearer " + token },
    }).then((response) => {
      setpageloader(false);
      setlabel(response.data.data.data);
      setnextpage(response.data.data.next_page_url);
    });
  }, []);
    
    const handlenext = () => {
      setmoreloader(true);
      const token = localStorage.getItem("token");
      axios
        .get(nextpage, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setlabel([...label, ...res.data.data.data]);
          setmoreloader(false);
          setnextpage(res.data.data.next_page_url);
          console.log(label);
        });
    };

    const deletecategory = (id) => {
        setpageloader(true);
        const obj = {
            id:id
        }
        const token = localStorage.getItem("token");
        ax.post("deletecategory", obj, {
          headers: { Authorization: "Bearer " + token },
        }).then(res => {
            setlabel(label.filter(d=>d.id !== id))
            Mgcontext.setmessage({ type: 'success', message: 'Your are Successfully Deleted!' })
            setpageloader(false)
        })
    }

    
  return (
    <Master>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div>
              <Link to="/label/create" className="btn btn-sm btn-danger">
                Create
              </Link>
            </div>
            {pageloader ? (
              <Spinner />
            ) : (
              <>
                <table
                  className="table "
                  style={{ backgroundColor: "#233243" }}
                >
                  <thead>
                    <tr>
                      <th className="text-white" scope="col ">
                        Name
                      </th>
                      <th className="text-white" scope="col ">
                        Option
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {label.map((d) => {
                      return (
                        <tr>
                          <td className="text-white">{d.name}</td>
                          <td>
                            <Link
                             to={`/label/edit/${d.id}`}
                              className="btn btn-sm btn-primary "
                            >
                              Edit
                            </Link>
                            <button
                              className="border-0"
                              style={{
                                backgroundColor: "#233243",
                              }}
                            ></button>
                            <Link onClick={()=>deletecategory(d.id)} className="btn btn-sm btn-danger">
                              Delete
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              disabled={nextpage ? false : true}
              onClick={() => handlenext()}
              className="btn btn-primary btn-fab btn-icon btn-round"
            >
              {moreloader ? (
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <i className="fas fa-arrow-down" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default All;
