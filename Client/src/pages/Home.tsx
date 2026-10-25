import React from "react";
import {
  FiMic,
  FiSettings,
  FiCode,
  FiCommand,
  FiArrowRight,
  FiPlayCircle,
} from "react-icons/fi";
import AssistantPreview from "../components/AssistantPreview";

export interface User {
  name: string;
  assistantName: string;
  plan: string;
}

interface HomeProps {
  user: User | null; 
}

// Extracted outside the component to prevent unnecessary memory reallocation on re-renders,
// ensuring optimal performance and cleaner maintainability.
const features = [
  {
    title: "Custom AI Training",
    description:
      "Feed Jarvish your documentation and data to create an assistant that truly understands your business logic.",
    icon: <FiSettings className="w-6 h-6 text-indigo-500" />,
    bgColor: "bg-indigo-50",
    hoverBorder: "group-hover:border-indigo-200",
  },
  {
    title: "Voice-Activated",
    description:
      "Enable natural, hands-free conversations. Users can speak directly to Jarvish for immediate assistance.",
    icon: <FiMic className="w-6 h-6 text-teal-500" />,
    bgColor: "bg-teal-50",
    hoverBorder: "group-hover:border-teal-200",
  },
  {
    title: "Action Execution",
    description:
      "Go beyond chatting. Configure Jarvish to execute commands, like redirecting users to specific service pages.",
    icon: <FiCommand className="w-6 h-6 text-rose-500" />,
    bgColor: "bg-rose-50",
    hoverBorder: "group-hover:border-rose-200",
  },
  {
    title: "Seamless Integration",
    description:
      "Embed your custom trained Jarvish bot directly into your existing website with just a few lines of code.",
    icon: <FiCode className="w-6 h-6 text-blue-500" />,
    bgColor: "bg-blue-50",
    hoverBorder: "group-hover:border-blue-200",
  },
];

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <main className="min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-16 max-w-7xl mx-auto">
        {/* Soft, Calm Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[32rem] bg-gradient-to-b from-indigo-100/60 via-slate-50/40 to-transparent rounded-[100%] blur-3xl -z-10 pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 shadow-sm text-sm font-semibold tracking-wide text-slate-700 mb-8 transition-transform hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Welcome to the Future of AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-8">
            Build, Train, and Deploy <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500">
              Your Own Jarvish
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            A calm, intelligent, and highly capable AI assistant platform. Train
            your chatbot, enable voice commands, and let it execute tasks
            seamlessly on your website.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
              Start Building Now
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-700 font-medium hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 group">
              <FiPlayCircle className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Preview Section Container */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <AssistantPreview />
      </section>

      {/* Features Grid Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent pointer-events-none -z-10" />
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            Powerful Capabilities
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Everything you need to create a truly interactive and helpful AI
            presence tailored for your users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 ${feature.hoverBorder} flex flex-col items-start`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bgColor} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
};

export default Home;