import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// pages
import Login from './auth/login/login';
import Home from "./home/home";
import NotFound from "./not-found/not-found";
import Register from "./auth/register/register";
import RestaurantDetails from "./restaurant-details/restaurant-details";
import Customer from "./auth/register/customer/customer";
import Restaurant from "./auth/register/restaurant/restaurant";
import { AppProvider } from "../context/app-context";
import { LocalizationProvider } from "../context/localization-context";
import Profile from "./profile/profile";
import RequireAuth from "../components/navigation/require-auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/styles/app.scss';
import RequireNotAuth from "../components/navigation/require-not-auth";

function App() {
    return (
        <AppProvider>
            <LocalizationProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" exact element={<RequireNotAuth>
                            <Login />
                        </RequireNotAuth>} />
                        <Route path="register" element={<RequireNotAuth>
                            <Register />
                        </RequireNotAuth>}>
                            <Route index element={<Customer />} />
                            <Route path="customer" element={<Customer />} />
                            <Route path="restaurant" element={<Restaurant />} />
                        </Route>
                        <Route path="/" exact element={<Home />} />
                        <Route exact path="/:restaurant_id" element={<RestaurantDetails />} />
                        <Route path="profile" element={<RequireAuth>
                            <Profile />
                        </RequireAuth>} />
                        <Route path="not-found" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </AppProvider>
    );
}

export default App;
