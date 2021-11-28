import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './auth/login/login';
import Dashboard from "./dashboard/dashboard";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
