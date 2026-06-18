import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

interface User {
  _id: string;
  name: string;
  email: string;
}

const App = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/getCurrentUser`, {
        withCredentials: true,
      });

      setUser(res.data);
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
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute user={user} loading={loading} />}>
        <Route element={<Navbar user={user} setUser={setUser} />}>
          <Route path="/home" element={<Home user={user} />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
