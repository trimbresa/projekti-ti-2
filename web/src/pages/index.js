import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './auth/login/login';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./home/home";
import NotFound from "./not-found/not-found";
import Register from "./auth/register/register";

import '../shared/styles/app.scss';
import RestaurantDetails from "./restaurant-details/restaurant-details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/:restaurant_id" element={<RestaurantDetails/>}/>
        <Route path="/not-found" element={<NotFound/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
