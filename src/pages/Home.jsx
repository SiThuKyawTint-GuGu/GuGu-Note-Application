import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ax from '../ax'
import Label from '../components/Label'
import Spinner from '../components/Spinner'
import MessageContext from '../context/MessageContext'
import Master from './layouts/Master'
const Home = () => {

  const ctxmessage = useContext(MessageContext) 
  const navigate = useNavigate();
  const { category_slug } = useParams();
  const [currentdata, setcurrentdata] = useState([]);
  const [loader, setloader] = useState(true);
  const [moreloader, setmoreloader] = useState(false);
  const [nextpage, setnextpage] = useState('');
  const [dloader, setdloader] = useState('');
  const [contribute, setcontribute] = useState([]);
  const [receivenote, setreceivenote] = useState([]);
  const [contributeloader, setcontributeloader] = useState(false);
  const Mgcontext = useContext(MessageContext);

  useEffect(() => {
    setloader(true);
    setcontributeloader(true);
    if (localStorage.getItem("token") === null) {
      ctxmessage.setmessage({
        type: "error",
        message: "You need to first login",
      });
      navigate("/login");
    }

    if (category_slug === undefined) {
      const token = localStorage.getItem("token");
      ax.get("/allnote", {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        setcurrentdata(res.data.data.data);
        setnextpage(res.data.data.next_page_url);
        setloader(false);
      });
    } else {
      const formdata = new FormData();
      formdata.append("slug", category_slug);

      const token = localStorage.getItem("token");
      ax.post("/searchnote", formdata, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        setcurrentdata(res.data.data);
        setnextpage(res.data.data.next_page_url);
        setloader(false);
      });
    }

    //Contribute note
    const token = localStorage.getItem("token");
    ax.get("/contributenote", {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      setcontributeloader(false);
      setcontribute(res.data.data);
    });

    //Receive note
    ax.get("/receivenote", {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      console.log(res.data.data)
     setcontributeloader(false);
     setreceivenote(res.data.data)
    });

  }, [category_slug])

  const handlenext = () => {
    setmoreloader(true)
    const token = localStorage.getItem("token");
    axios
      .get(nextpage, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setcurrentdata([ ...currentdata,...res.data.data.data]);
        setmoreloader(false)
        setnextpage(res.data.data.next_page_url);
        console.log(currentdata); 
      });
  };

  const deletenote = (id) => {
    setdloader(id);
    const obj = {
      id:id
    }
    const token = localStorage.getItem("token");
    ax.post("deletenote", obj, {
      headers: { Authorization: "Bearer " + token },
    }).then(res => {
      if (res.data.success === 'true') {
        setdloader(id);
        setcurrentdata(currentdata.filter(d => d.id !== id))
        Mgcontext.setmessage({ type: 'success', message: 'You are Successfully Deleted!' })
     }
    })
  }

  return (
    <Master>
      <div className="container mt-3">
        <div className="row">
          {/* For Category and Information */}
          <div className="col-md-4">
            <Label />
            {contributeloader ? (
              <Spinner />
            ) : (
              <>
                <div className="card bg-gray-100">
                  <div className="card-body">
                    <li className="list-group-item bg-bg text-white">
                      Contribute Notes
                      <a
                        href
                        className="badge badge-dark  text-white float-right"
                      >
                        All
                      </a>
                    </li>
                    <ul className="list-group label">
                      {contribute.map((d) => {
                        return (
                          <li className="list-group-item bg-dark text-white">
                            <i className="far fa-newspaper" />
                            You Share &nbsp; &nbsp; {d.notetitle}
                            <small> from</small>
                            <b className="text-primary">{d.username}</b>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>
            )}
            {contributeloader ? (
              <Spinner />
            ) : (
              <>
                <div className="card bg-gray-100">
                  <div className="card-body">
                    <li className="list-group-item bg-bg text-white">
                      Receive Notes
                      <a
                        href
                        className="badge badge-dark  text-white float-right"
                      >
                        All
                      </a>
                    </li>
                    <ul className="list-group label">
                      {receivenote.map((d) => {
                        return (
                          <li className="list-group-item bg-dark text-white">
                            <i className="far fa-newspaper" />
                            You got &nbsp; &nbsp; {d.notetitle}
                            <small> from</small>
                            <b className="text-primary">{d.username}</b>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <Link
                      to="/note/create"
                      className="btn btn-danger text-white"
                    >
                      Create Note
                    </Link>
                  </div>
                  {/* Loop Product */}
                  {loader && <Spinner />}
                  {!loader && (
                    <>
                      {currentdata.map((d) => {
                        return (
                          <div className="col-md-4" key={d.id}>
                            <div className="card shadow-lg mt-4">
                              <Link to={`/note/${d.id}`}>
                                <div
                                  className="card-header "
                                  style={{ backgroundColor: d.color }}
                                >
                                  <h6 className="text-white p-1">{d.title}</h6>
                                </div>
                              </Link>
                              <div className="card-body">
                                <div className="row ">
                                  <div className="col-md-4 text-center">
                                    <Link
                                      to={`/note/${d.id}`}
                                      className="badge badge-primary"
                                    >
                                      <i className="fas fa-eye" />
                                    </Link>
                                  </div>
                                  <div className="col-md-4 text-center">
                                    <a
                                      onClick={() => deletenote(d.id)}
                                      href
                                      className="badge badge-danger"
                                    >
                                      {dloader === d.id ? (
                                        <div
                                          class="spinner-border spinner-border-sm me-2"
                                          role="status"
                                        >
                                          <span class="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      ) : (
                                        <>
                                          {" "}
                                          <i className="fas fa-trash" />
                                        </>
                                      )}
                                    </a>
                                  </div>
                                  <div className="col-md-4 text-center">
                                    <Link
                                      to={`/contribute/${d.id}`}
                                      className="badge badge-warning"
                                    >
                                      <i className="fas fa-share" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                {/* For Load */}
                <div className="row mt-4">
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
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default Home