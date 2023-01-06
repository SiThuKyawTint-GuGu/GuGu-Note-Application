import axios from 'axios';
import ax from "../ax";
import React, { createContext, useEffect, useState } from 'react'

const LabelContext = createContext();

export const LabelContextProvider = (props) => {
    const [label, setlabel] = useState([]);
    const [loader, setloader] = useState(false)
    const [selectlabel, setselectlabel] = useState(null);
   
    return (
        <LabelContext.Provider value={{label,setlabel,loader,selectlabel,setselectlabel,setloader}}>
            {props.children}
        </LabelContext.Provider>
    )
}




export default LabelContext