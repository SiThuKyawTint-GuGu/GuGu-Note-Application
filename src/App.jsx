import React from 'react'
import {BrowserRouter,Link} from 'react-router-dom'
import { AuthContextprovider } from './context/AuthContext';
import { LabelContextProvider } from './context/LabelContext';
import  { MessageContextProvider } from './context/MessageContext';
import MainRouter from './Router/MainRouter'

const App = () => {
  return (
    <LabelContextProvider>
      <MessageContextProvider>
        <AuthContextprovider>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </AuthContextprovider>
      </MessageContextProvider>
    </LabelContextProvider>
  );
}

export default App