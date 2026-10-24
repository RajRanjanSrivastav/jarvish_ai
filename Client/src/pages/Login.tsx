import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from '../types';
interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  //  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setUser }: LoginProps) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const handleLogin = async () => {
    try {
      // setLoading(true);
      console.log(import.meta.env.VITE_API_BASE_URL, API_BASE_URL);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const payload = { name: displayName, email: email };
      const res = await axios.post(API_BASE_URL + "/api/auth/google", payload, {
        withCredentials: true,
      });
      console.log("result _ user =>: ", res.data.user);
      setUser(res.data.user);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login process failed:", error);
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-red-100 overflow-hidden flex items-center justify-center">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* left */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-100 text-red-600 text-sm font-medium">
            <IoSparklesSharp />
            AI Voice Assistant Platform
          </div>

          <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-[#081028]">
            Build AI Assistants
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-emerald-500">
              For Any Website
            </span>
          </h1>

          <p className="mt-8 text-lg text-[#475569] leading-8 mam-w-2xl">
            Create customizable AI voice assistant that talk guide users, and
            integrate into any website instantly.
          </p>

          <button
            onClick={handleLogin}
            className="mt-10 h-16 px-8 rounded-2xl bg-linear-to-r from-red-500 to-emerald-500 text-white text-lg font-semibold flex items-center gap-4 shadow-[0_20px_80px_rgba(139,92,246,0.25)] hover:scale-[1.02] transition cursor-pointer"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="mt-4 text-sm text-">
            Free plan includes 200 AI responses
          </p>
        </div>

        {/* right */}
        <div>
          <p>Hello Gyus</p>
        </div>
      </div>

    </div>
  );
};

export default Login;
