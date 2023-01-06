import React, { createContext, useState } from 'react'

const AuthContext = createContext();
export const AuthContextprovider = (props) => {
    const [authuser, setAuthuser] = useState({});
    return (
        <AuthContext.Provider value={{authuser:authuser,setAuthuser:setAuthuser}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext