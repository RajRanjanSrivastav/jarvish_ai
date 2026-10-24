import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Builder from "./pages/Builder";
import type { User } from './types';


const App = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  
  // useEffect(() => {
  //   if (!loading && user) {
  //     navigate("/", { replace: true });
  //   }
  // }, [user, loading, navigate]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/getCurrentUser`, {
        withCredentials: true,
      });

      setUser(res.data);
      console.log("in app file : ", user);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login setUser={setUser}/>} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute user={user} loading={loading} />}>
        <Route element={<Navbar user={user} setUser={setUser} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/builder" element={<Builder user={user} setUser={setUser} />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
