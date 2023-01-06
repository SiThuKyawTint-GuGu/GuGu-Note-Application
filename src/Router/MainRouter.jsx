import React from "react";
import { Routes, Route } from "react-router-dom";
import Contribute from "../contribute/Contribute";
import All from "../label/All";
import Createlabel from "../label/Createlabel";
import Editlabel from "../label/Editlabel";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import CreateNote from "../pages/Note/CreateNote";
import Edit from "../pages/Note/Edit";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/:category_slug/note" element={<Home />}></Route>
        <Route path="/note/create" element={<CreateNote />}></Route>
        <Route path="/note/:slug" element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* Label */}
        <Route path="/label" element={<All />}></Route>
        <Route path="/label/create" element={<Createlabel />}></Route>
        <Route path="/label/edit/:id" element={<Editlabel />}></Route>
        {/* Contributes */}
        <Route path='/contribute/:id' element={<Contribute/>}></Route>
      </Routes>
    </>
  );
};

export default MainRouter;
