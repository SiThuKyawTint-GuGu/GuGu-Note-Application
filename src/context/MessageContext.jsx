import React, { createContext, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const MessageContext = createContext();

export const MessageContextProvider = (props) => {
    const [message, setmessage] = useState({});
    switch (message.type) {
      case "success":
        toast.success(message.message);
        break;
      case "error":
        toast.error(message.message);
        break;
    }
    return (
      <MessageContext.Provider
        value={{ message: message, setmessage: setmessage }}
      >
        {props.children}
        <ToastContainer />
      </MessageContext.Provider>
    );
}

export default MessageContext