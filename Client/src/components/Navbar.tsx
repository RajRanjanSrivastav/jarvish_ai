import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiLayers, FiCreditCard } from "react-icons/fi";
import axios from "axios";

// Define the User interface for strict type safety
export interface User {
  name: string;
  assistantName: string;
  plan: string;
}

interface NavbarProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      setUser(null);
      navigate("/login");
    } catch (error) {
    }
  };

  // Centralized navigation configuration for scalable maintainability
  const navLinks = [
    { name: "Builder", path: "/builder", icon: FiLayers },
    { name: "Billing", path: "/billing", icon: FiCreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Section: Logo & Desktop Tabs */}
            <div className="flex items-center">
              {/* Brand Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 text-white font-bold text-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
                  J
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                    Jarvish AI
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
                    Your AI Assistant
                  </p>
                </div>
              </Link>

              {/* Desktop Tabs */}
              <div className="hidden md:flex md:items-center md:space-x-8 md:ml-12 h-16">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 px-1 pt-1 border-b-2 h-full text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "border-indigo-600 text-indigo-700"
                          : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                      }`
                    }
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right Section: User & Mobile Toggle */}
            <div className="flex items-center gap-4">
              {/* Desktop User Info */}
              <div className="hidden md:flex items-center gap-5">
                <div className="text-right">
                  <h2 className="text-sm font-semibold text-slate-900">
                    {user?.name || "Guest User"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {user?.assistantName || "No Assistant"}
                  </p>
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 capitalize border border-indigo-100 shadow-sm">
                  {user?.plan || "Free"}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-teal-50 text-indigo-700 font-bold border border-indigo-200 shadow-sm">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  aria-label="Logout"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 pb-3 pt-2 px-4 bg-white border-t border-slate-100 shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile User Profile Section */}
          <div className="border-t border-slate-200 pb-6 pt-4 bg-slate-50 px-4">
            <div className="flex items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
              <div className="shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-teal-50 text-indigo-700 font-bold border border-indigo-200">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="text-base font-bold text-slate-900">
                  {user?.name || "Guest User"}
                </div>
                <div className="text-sm font-medium text-slate-500">
                  {user?.assistantName || "No Assistant"}
                </div>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 capitalize border border-indigo-100">
                {user?.plan || "Free"}
              </span>
            </div>

            <div className="mt-4">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-rose-600 bg-white border border-rose-100 hover:bg-rose-50 transition-colors shadow-sm"
              >
                <FiLogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
