import React from "react";
import Master from "../layouts/Master";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useContext } from "react";
import LabelContext from "../../context/LabelContext";
import { useEffect } from "react";
import ax from "../../ax";
import MessageContext from "../../context/MessageContext";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [color, setcolor] = useState("");
  const [loader, setloader] = useState(false);
  const [error, seterror] = useState([]);
  const label = useContext(LabelContext);
  const MgContext = useContext(MessageContext);
  const navigate = useNavigate();

  const createnote = () => {
    setloader(true);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("category_id", category);
    formdata.append("description", description);
    formdata.append("color", color);
    const token = localStorage.getItem("token");
    ax.post("/createnoteapp", formdata, {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      if (res.data.success === "false") {
        setloader(false);
        seterror(res.data.data);
        MgContext.setmessage({
          type: "error",
          message: "You need to fill all fields!",
        });
          return;
      } else {
        setloader(false);
        MgContext.setmessage({
          type: "success",
          message: "Create Success!",
        });
          navigate("/"); 
          return;
          
      }
    });
  };

  return (
    <Master>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card my-5 rounded-lg">
              <div
                className="title border-1 rounded-1 p-3 text-white"
                style={{ backgroundColor: color ? color : "#32325D" }}
              >
                Create Note
              </div>
              <div className="p-3">
                <div className="form-group">
                  <label htmlFor="" className="text-white">
                    Enter Title
                  </label>
                  <input
                    type="text"
                    onChange={(e) => settitle(e.target.value)}
                    className={`form-control ${
                      error.title && "border-danger border"
                    } `}
                  />
                  {error.title ? (
                    <>
                      <small className="text-sm text-danger">
                        {error.title}
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group ">
                  <label htmlFor="" className="text-white">
                    Choose Label
                  </label>

                  <select
                    name=""
                    id=""
                    onChange={(e) => setcategory(e.target.value)}
                    className={`form-control ${
                      error.category_id && "border-danger border"
                    } `}
                  >
                    <option value="">Choose Label</option>
                    {label.label.data ? (
                      label.label.data.map((d) => {
                        return <option value={d.id}>{d.name}</option>;
                      })
                    ) : (
                      <h1>Ma shi</h1>
                    )}
                  </select>
                  {error.category_id ? (
                    <>
                      <small className="text-sm text-danger">
                        {error.category_id}
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group ">
                  <label htmlFor="" className="text-white">
                    Choose Color
                  </label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setcolor(e.target.value)}
                    className="form-control"
                  >
                    <option value="#dc3545">Red</option>
                    <option value="#ffc107">Yellow</option>
                    <option value="#28a745">Green</option>
                    <option value="#007bff">Blue</option>
                    <option value="#343a40">Dark</option>
                    <option value="#e83e8c">Pink</option>
                    <option value="#6f42c1">Purple</option>
                    <option value="#fd7e14">ornage</option>
                  </select>
                </div>
                <div className="form-group ">
                  <label htmlFor="" className="text-white">
                    Enter Description
                  </label>
                  <ReactQuill
                    className={` bg-white ${
                      error.category && "border-danger border"
                    } `}
                    theme="snow"
                    value={description}
                    onChange={setdescription}
                  />
                  {error.description ? (
                    <>
                      <small className="text-sm text-danger">
                        {error.description}
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <button
                    onClick={() => createnote()}
                    className="btn bg-bg text-white"
                  >
                    {loader ? (
                      <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      ""
                    )}
                    Create Note
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

export default CreateNote;
