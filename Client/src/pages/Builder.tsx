import axios from "axios";
import React, { useState } from "react";
import {
  FiSave,
  FiPlus,
  FiTrash2,
  FiBriefcase,
  FiSettings,
  FiLink,
  FiKey,
  FiExternalLink,
  FiMic,
  FiCompass,
  FiCpu,
  FiArrowLeft,
} from "react-icons/fi";
import {
  FiCode,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import type { User } from '../types';

interface BuilderProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface PageRoute {
  name: string;
  path: string;
  keywords: string;
}

interface AssistantFormData {
  assistantName: string;
  businessName: string;
  businessType: string;
  businessDescription: string;
  theme: string;
  tone: string;
  enableVoice: boolean;
  enableNavigation: boolean;
  geminiApiKey: string;
  pages: PageRoute[];
}


const Builder: React.FC<BuilderProps> = ({ user, setUser }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [editAssistant, setEditAssistant] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [copied, setCopied] = useState(false);


  // A mock variable representing whether the user is in "edit mode" or not
  // const editAssistant = false; 

  const embedCodeString = `<script src="https://cdn.jarvish.ai/widget.js" data-assistant-id="${user?.name?.toLowerCase().replace(/\s+/g, '-') || 'demo'}"></script>`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCodeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  // Centralized, strictly-typed form state
  const [formData, setFormData] = useState<AssistantFormData>({
    assistantName: user?.assistantName || "",
    businessName: "",
    businessType: "",
    businessDescription: "",
    theme: "glass",
    tone: "professional",
    enableVoice: true,
    enableNavigation: true,
    geminiApiKey: "",
    pages: [{ name: "Home", path: "/", keywords: "Home Back" }],
  });

  // Generic input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Custom Toggle Handler
  const handleToggle = (field: keyof AssistantFormData) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Dynamic Routing Handlers
  const handlePageChange = (index: number, field: keyof PageRoute, value: string) => {
    const newPages = [...formData.pages];
    newPages[index][field] = value;
    setFormData((prev) => ({ ...prev, pages: newPages }));
  };

  const addPage = () => {
    setFormData((prev) => ({
      ...prev,
      pages: [...prev.pages, { name: "", path: "", keywords: "" }],
    }));
  };

  const removePage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index),
    }));
  };

  // fetch the edit data

  const fetchUserData = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/user/getCurrentUser`, {
      withCredentials: true,
    })
    const data = res.data;
    console.log(res)
    setFormData({
      assistantName: data.assistantName,
      businessName: data.businessName,
      businessType: data.businessType,
      businessDescription: data.businessDescription,
      theme: data.theme,
      tone: data.tone,
      enableVoice: data.enableVoice,
      enableNavigation: data.enableNavigation,
      geminiApiKey: data.geminiApiKey,
      pages: data.pages,
    })
  }

  // Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("sdfksdjfl", e.target, formData)
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/saveAssistant`, formData, { withCredentials: true });

      console.log("response : ", response);

      setSuccessMessage("Jarvish AI configured successfully!");

      // Sync global state
      if (user) {
        setUser({ ...user, assistantName: formData.assistantName });
      }

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Setup Complete / Dashboard Section */}

      {user?.isSetupComplete && !editAssistant ? (
        <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto relative z-20">
          <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 p-8 sm:p-12 mb-6 transition-all">

            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Active Assistant
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {user?.assistantName || "Your Assistant"}
              </h2>
              <p className="text-slate-500 mt-3 text-lg font-medium">
                Your assistant is trained, configured, and ready to be deployed.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {/* Card 1 */}
              <div className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 flex flex-col justify-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-1">
                <p className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide group-hover:text-indigo-400 transition-colors">Current Plan</p>
                <h3 className="text-2xl font-bold text-slate-900 capitalize">{user?.plan || "Free"}</h3>
              </div>

              {/* Card 2 */}
              <div className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 flex flex-col justify-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-1">
                <p className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide group-hover:text-indigo-400 transition-colors">Gemini Status</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${user?.geminiStatus === "active" ? "bg-emerald-500" :
                    user?.geminiStatus === "invalid" ? "bg-rose-500" : "bg-amber-500"
                    } animate-pulse`}></span>
                  <h3 className={`text-xl font-bold capitalize ${user?.geminiStatus === "active" ? "text-emerald-700" :
                    user?.geminiStatus === "invalid" ? "text-rose-700" : "text-amber-700"
                    }`}>
                    {user?.geminiStatus || "Pending"}
                  </h3>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 flex flex-col justify-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-1">
                <p className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide group-hover:text-indigo-400 transition-colors">
                  {user?.plan === "free" ? "Messages Left" : "Plan Expiry"}
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {user?.plan === "free" ? "1,000" : "Auto-renews"}
                </h3>
              </div>
            </div>

            <hr className="border-slate-100 mb-10" />

            {/* Installation Instructions */}
            <div className="mb-10 rounded-4xl bg-linear-to-b from-indigo-50/80 to-white border border-indigo-100/60 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">
                Where to paste this script?
              </h3>
              <p className="text-sm text-indigo-700/80 font-medium leading-relaxed mb-6">
                Locate your website's main HTML file (usually <code>index.html</code>) and paste the integration snippet exactly before the closing <span className="font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md shadow-sm border border-indigo-200/50">&lt;/body&gt;</span> tag.
              </p>

              {/* HTML Context Example */}
              <div className="relative rounded-2xl bg-[#0f172a] ring-1 ring-white/10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-inner"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-inner"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-inner"></div>
                  </div>
                  <span className="ml-3 text-[11px] font-mono text-slate-400 font-medium tracking-widest">index.html</span>
                </div>

                <div className="mt-10 p-5 text-[13px] font-mono leading-relaxed overflow-x-auto text-slate-300">
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">1</span><span className="text-pink-400">&lt;body&gt;</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">2</span><span className="ml-4 text-slate-500 italic">&lt;!-- Your Website Content --&gt;</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">3</span><span className="ml-4 text-slate-500 italic">&lt;div id="app"&gt;&lt;/div&gt;</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">4</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">5</span><span className="ml-4 text-emerald-400/80 italic">&lt;!-- Jarvish Assistant --&gt;</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">6</span><span className="ml-4 text-pink-400">&lt;script</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">7</span><span className="ml-8 text-teal-300">src=</span><span className="text-amber-300">"{typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'https://cdn.jarvish.ai'}/assistant.ts"</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">8</span><span className="ml-8 text-teal-300">data-user-id=</span><span className="text-amber-300">"{user?._id || 'demo'}"</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">9</span><span className="ml-4 text-pink-400">&gt;&lt;/script&gt;</span></div>
                  <div className="flex items-start"><span className="w-8 shrink-0 text-slate-600 select-none">10</span><span className="text-pink-400">&lt;/body&gt;</span></div>
                </div>
              </div>
            </div>

            {/* Embed Code Section */}
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FiCode className="text-indigo-500" /> Your Personal Integration Code
                </h3>
                <p className="text-slate-500 mt-2 font-medium text-sm">
                  Click the button inside the code block to copy your unique snippet to the clipboard.
                </p>
              </div>

              <div className="relative group">
                {/* Code Block Container */}
                <div className="rounded-2xl bg-[#0f172a] p-6 pr-16 overflow-x-auto ring-1 ring-white/10 shadow-2xl transition-all duration-300">
                  <pre className="text-[13px] text-slate-300 font-mono whitespace-pre-wrap break-all leading-relaxed">
                    <span className="text-pink-400">&lt;script</span>{" "}
                    <span className="text-teal-300">src=</span><span className="text-amber-300">"{typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'https://cdn.jarvish.ai'}/assistant.ts"</span>{" "}
                    <span className="text-teal-300">data-user-id=</span><span className="text-amber-300">"{user?._id || 'demo'}"</span>
                    <span className="text-pink-400">&gt;&lt;/script&gt;</span>
                  </pre>
                </div>

                {/* Copy Button Overlay */}
                <button
                  onClick={handleCopyCode}
                  className={`absolute top-1/2 -translate-y-1/2 right-4 p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border ${copied
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/20 hover:text-white hover:scale-105 opacity-0 group-hover:opacity-100 focus:opacity-100"
                    }`}
                  aria-label="Copy embed code"
                  title="Copy to clipboard"
                >
                  {copied ? <FiCheck className="w-5 h-5" /> : <FiCopy className="w-5 h-5" />}
                </button>
              </div>

              {/* Optional instructions helper */}
              <div className="mt-6 flex items-start gap-4 p-5 rounded-2xl bg-linear-to-r from-slate-50 to-white border border-slate-200/60 shadow-sm text-slate-600 text-sm transition-all hover:shadow-md">
                <div className="mt-0.5 p-1.5 bg-slate-100 rounded-lg"><FiSettings className="w-4 h-4 text-slate-500" /></div>
                <p className="leading-relaxed">
                  <strong className="text-slate-900 font-bold">Live Updates:</strong> Once embedded, any changes you make in the Builder tab will automatically reflect on your live website. No need to update the HTML snippet again.
                </p>
              </div>

            </div>

          </div>
          <button
            type="button"
            onClick={() => { setEditAssistant(true); fetchUserData() }}
            className="group flex items-center justify-center gap-2 ms-auto text-sm font-bold text-white bg-linear-to-r from-indigo-500 to-teal-400  px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <FiPlus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            Edit Assistant
          </button>
        </section>
      ) : (
        <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-24 relative overflow-hidden">

          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-160 bg-linear-to-b from-indigo-100/40 via-purple-50/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">

            {/* Header Section */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/60 shadow-sm text-sm font-semibold tracking-wide text-slate-700 mb-6 cursor-default">
                <FiCpu className="text-indigo-500" />
                Workspace
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Architect Your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-teal-500">Assistant</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                Fine-tune Jarvish's core intelligence, aesthetic, and routing capabilities to perfectly match your brand.
              </p>
            </div>

            {/* Status Messages */}
            {successMessage && (
              <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-sm font-semibold flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-800 text-sm font-semibold shadow-sm animate-in fade-in slide-in-from-top-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 relative">

              {/* 1. Basic Information */}
              <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100%] -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <FiBriefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Basic Identity</h2>
                    <p className="text-sm text-slate-500 font-medium">Core details and business context</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">AI Assistant Name</label>
                    <input
                      type="text"
                      name="assistantName"
                      value={formData.assistantName}
                      onChange={handleChange}
                      placeholder="e.g., Jarvish"
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g., Acme Solutions"
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Business Type / Industry</label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    placeholder="e.g., E-commerce, Real Estate, SaaS"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Business Description</label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what your business does to help Jarvish understand its primary objective..."
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-y font-medium placeholder:text-slate-400"
                    required
                  />
                </div>
              </section>

              {/* 2. Appearance & Behavior */}
              <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-bl-[100%] -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <FiSettings className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Appearance & Behavior</h2>
                    <p className="text-sm text-slate-500 font-medium">Visuals, personality, and interaction modes</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Widget Theme</label>
                    <div className="relative">
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                      >
                        <option value="light">Minimal Light</option>
                        <option value="glass">Glassmorphism</option>
                        <option value="dark">Deep Space Dark</option>
                        <option value="neon">Neon Cyberpunk</option>
                        <option value="retro">Retro Terminal</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Assistant Tone</label>
                    <div className="relative">
                      <select
                        name="tone"
                        value={formData.tone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                      >
                        <option value="professional">Professional & Calm</option>
                        <option value="friendly">Friendly & Casual</option>
                        <option value="sales">Sales & Conversion</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Feature Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 sm:px-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-colors ${formData.enableVoice ? 'bg-teal-100 text-teal-700' : 'bg-slate-200 text-slate-500'}`}>
                        <FiMic className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Enable Voice Interaction</h4>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">Allow users to speak directly to Jarvish</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('enableVoice')}
                      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${formData.enableVoice ? 'bg-teal-500' : 'bg-slate-300'
                        }`}
                    >
                      <span className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${formData.enableVoice ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 sm:px-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-colors ${formData.enableNavigation ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}`}>
                        <FiCompass className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Enable AI Navigation</h4>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">Allow Jarvish to seamlessly redirect users</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle('enableNavigation')}
                      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${formData.enableNavigation ? 'bg-indigo-500' : 'bg-slate-300'
                        }`}
                    >
                      <span className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${formData.enableNavigation ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </section>

              {/* 3. API Key Configuration */}
              <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-[100%] -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <FiKey className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Gemini Interface</h2>
                    <p className="text-sm text-slate-500 font-medium">Connect your Google Gemini AI engine</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-full flex-1">
                    <input
                      type="password"
                      name="geminiApiKey"
                      value={formData.geminiApiKey}
                      onChange={handleChange}
                      placeholder="Paste your API Key here (AIzaSy...)"
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-mono text-sm placeholder:font-sans placeholder:text-base placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 text-sm font-bold text-white bg-linear-to-r from-indigo-500 to-teal-400 px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 shrink-0"
                  >
                    Get API Key
                    <FiExternalLink className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                </div>
                <p className="text-sm text-slate-400 mt-4 font-medium ml-1">
                  Your key is strongly encrypted and stored securely. Essential for the core AI logic to operate.
                </p>
              </section>

              {/* 4. Navigation Routing Map */}
              <section
                className={`bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 relative overflow-hidden ${!formData.enableNavigation ? 'opacity-60 grayscale-50 pointer-events-none' : 'hover:shadow-xl hover:-translate-y-1'
                  }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100%] -z-10 transition-transform duration-500"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                      <FiLink className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Navigation Map</h2>
                      <p className="text-sm text-slate-500 font-medium">Teach Jarvish your website structure</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addPage}
                    className="group flex items-center justify-center gap-2 text-sm font-bold text-white bg-linear-to-r from-indigo-500 to-teal-400  px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <FiPlus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                    Add Page Route
                  </button>
                </div>

                {!formData.enableNavigation && (
                  <div className="mb-8 p-4 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold text-center">
                    Enable "AI Navigation" in the Appearance section above to unlock routing configurations.
                  </div>
                )}

                <div className="space-y-4 bg-slate-50/50 p-4 sm:p-6 rounded-4xl border border-slate-100">
                  {formData.pages.map((page, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        value={page.name}
                        onChange={(e) => handlePageChange(index, "name", e.target.value)}
                        placeholder="Page Name (e.g., Pricing)"
                        className="w-full sm:w-1/2 px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium font-mono text-sm shadow-sm placeholder:font-sans placeholder:text-base placeholder:text-slate-400"
                        required={formData.enableNavigation}
                      />
                      <input
                        type="text"
                        value={page.path}
                        onChange={(e) => handlePageChange(index, "path", e.target.value)}
                        placeholder="URL Path (e.g., /pricing)"
                        className="w-full sm:w-1/2 px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium font-mono text-sm shadow-sm placeholder:font-sans placeholder:text-base placeholder:text-slate-400"
                        required={formData.enableNavigation}
                      />
                      <input
                        type="text"
                        value={page.keywords}
                        onChange={(e) => handlePageChange(index, "keywords", e.target.value)}
                        placeholder="URL Path (e.g., /pricing)"
                        className="w-full sm:w-1/2 px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium font-mono text-sm shadow-sm placeholder:font-sans placeholder:text-base placeholder:text-slate-400"
                        required={formData.enableNavigation}
                      />
                      <button
                        type="button"
                        onClick={() => removePage(index)}
                        disabled={formData.pages.length === 1}
                        className="w-full sm:w-auto p-4 flex justify-center text-rose-500 hover:bg-rose-50 hover:text-rose-600 border border-transparent hover:border-rose-100 rounded-2xl transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-transparent shrink-0"
                        aria-label="Remove page route"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sticky Floating Submit Bar */}
              <div className="p-4 sm:p-6 flex justify-center">
                <div className="w-full max-w-4xl flex justify-end gap-4">
                  <button
                    type="button"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-2xl border border-slate-400 bg-slate-100 text-slate-600 font-semibold cursor-pointer hover:bg-slate-200 hover:text-slate-800 transition-all shadow-xs hover:-translate-y-0.5 active:scale-98 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    onClick={() => setEditAssistant(false)}
                  >
                    <FiArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-linear-to-r from-indigo-600 to-teal-500 text-white font-bold hover:opacity-95 transition-all shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <FiSave className="w-5 h-5" />
                    )}
                    {isSubmitting ? "Deploying Assistant..." : "Save & Deploy Jarvish"}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  )
};

export default Builder;