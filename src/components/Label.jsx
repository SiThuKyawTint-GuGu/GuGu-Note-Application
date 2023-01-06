import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ax from '../ax';
import LabelContext from '../context/LabelContext';
import Spinner from './Spinner'
const Label = () => {

  const { label, loader, selectlabel, setselectlabel ,setlabel,setloader} = useContext(LabelContext);
  const { pathname } = useLocation();
  
   useEffect(() => {
     const token = localStorage.getItem("token");
     ax.get("/getcategory", {
       headers: { Authorization: "Bearer " + token },
     }).then((response) => {
       setlabel(response.data);
       setloader(true);
     });
   }, []);
  return (
    <>
      <div className="card bg-gray-100">
        {!loader && <Spinner />}
        {loader && (
          <div className="card-body">
            <div className='d-flex justify-content-between bg-bg'>
              <div >
                <li className="list-group-item bg-bg text-white ">Label</li>
              </div>
              <div>
               <Link to='/label' className='btn btn-danger btn-sm mt-1 p-2'>All Show</Link>
              </div>
            </div>
            <ul className="list-group label">
              <Link to="/" onClick={() => setselectlabel(null)}>
                <li
                  className={`list-group-item text-white ${
                    pathname === "/" ? "bg-danger" : "bg-dark"
                  }  `}
                >
                  <span className="fas fa-tags text-white text-small" />
                  &nbsp; &nbsp; All
                  <span className="badge badge-primary float-right">3</span>
                </li>
              </Link>
              {label.data.map((d) => {
                return (
                  <Link key={d.id} to={`/${d.slug}/note`}>
                    <li
                      className={`list-group-item text-white ${
                        d.id === selectlabel ? "bg-danger" : "bg-dark"
                      }`}
                      onClick={() => setselectlabel(d.id)}
                    >
                      <span className="fas fa-tags text-white text-small" />
                      &nbsp; &nbsp; {d.name}
                      <span className="badge badge-primary float-right">3</span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Label