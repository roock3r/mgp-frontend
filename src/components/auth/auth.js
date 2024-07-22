import React from 'react';
import Wrapper from "../wrapper";
import Login from "./login";
import {Route, Routes} from "react-router-dom";
import Main from "../frontend/main";

const Auth = () => {
    return (
            <Wrapper>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Main />} />
                </Routes>
            </Wrapper>
    );
};

export default Auth;
