import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Login from "./LogIn";
import Registration from "./Registration";


export const useRoutes = (isLogin) => {
    console.log(isLogin)
    if (!isLogin) {
        
        return (
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to='/login' replace />} />
            <Route path="/registration" element={<Registration />} />
            </Routes>           
        )
    }
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Navigate to='/' replace />} />
            <Route path="/registration" element={<Navigate to='/' replace />} />
        </Routes>
        
    )
}
