import React from "react";
import Box from "@mui/material/Box";
import {Route, Routes } from "react-router-dom";
import Login from "../components/LogIn";
import Registration from "../components/Registration";

export default function AuthPage() {
    return (
        
            <Box
                component="form"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: "8rem",
                }}
                noValidate
                autoComplete="off"
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </Box>
       
    );

}
