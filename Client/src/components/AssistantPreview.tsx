import React, { useState, useEffect } from "react";
import {
  FiMic,
  FiMicOff,
  FiSend,
  FiLayers,
  FiRadio,
  FiTerminal,
  FiSpeaker,
} from "react-icons/fi";

type ThemeType = "light" | "glass" | "dark" | "neon" | "retro";

interface ThemeStyles {
  bg: string;
  overlay: string;
  orb: string;
  cardBorder: string;
  text: string;
  sub: string;
  listening: string;
  wave: string;
  button: string;
  inputBg: string;
  fontClass: string;
}

const AssistantPreview: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<ThemeType>("glass");
  const [isListening, setIsListening] = useState<boolean>(true);
  const [simulatedText, setSimulatedText] = useState<string>(
    "Jarvish is listening...",
  );

  const previewThemes: Record<ThemeType, ThemeStyles> = {
    light: {
      bg: "bg-white",
      overlay:
        "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_50%)]",
      orb: "from-indigo-400 via-cyan-400 to-teal-400",
      cardBorder: "border border-slate-200/80 shadow-sm",
      text: "text-slate-900",
      sub: "text-slate-500",
      listening: "text-emerald-500",
      wave: "bg-emerald-500",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      inputBg:
        "bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500",
      fontClass: "font-sans",
    },
    glass: {
      bg: "bg-white/40 backdrop-blur-xl",
      overlay:
        "bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.12),transparent_50%)]",
      orb: "from-indigo-500 via-purple-500 to-teal-400",
      cardBorder:
        "border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]",
      text: "text-slate-900",
      sub: "text-slate-500",
      listening: "text-teal-600",
      wave: "bg-teal-500",
      button:
        "bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-sm hover:opacity-95",
      inputBg:
        "bg-white/50 backdrop-blur-sm border border-white/60 focus:bg-white/80 focus:border-indigo-500",
      fontClass: "font-sans",
    },
    dark: {
      bg: "bg-slate-950",
      overlay:
        "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]",
      orb: "from-cyan-400 via-indigo-500 to-purple-500",
      cardBorder: "border border-slate-800",
      text: "text-white",
      sub: "text-slate-400",
      listening: "text-cyan-400",
      wave: "bg-cyan-400",
      button:
        "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]",
      inputBg:
        "bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20",
      fontClass: "font-sans",
    },
    neon: {
      bg: "bg-neutral-950",
      overlay:
        "bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.15),transparent_50%)]",
      orb: "from-fuchsia-500 via-purple-600 to-cyan-400",
      cardBorder:
        "border border-fuchsia-500/30 shadow-[0_0_20px_rgba(236,72,153,0.1)]",
      text: "text-white tracking-wide",
      sub: "text-fuchsia-400 font-medium",
      listening: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]",
      wave: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
      button:
        "bg-transparent border border-fuchsia-500/60 text-fuchsia-400 hover:bg-fuchsia-500/10 shadow-[0_0_12px_rgba(236,72,153,0.2)]",
      inputBg:
        "bg-neutral-900/80 border border-neutral-800 text-cyan-400 placeholder-neutral-600 focus:border-fuchsia-500",
      fontClass: "font-mono text-xs",
    },
    retro: {
      bg: "bg-[#0b0f08]",
      overlay:
        "bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_50%)]",
      orb: "from-green-500 via-emerald-600 to-green-800",
      cardBorder:
        "border border-green-900/60 shadow-[inset_0_0_12px_rgba(0,255,0,0.05)]",
      text: "text-green-400 uppercase tracking-widest",
      sub: "text-green-600/80",
      listening: "text-green-400 animate-pulse",
      wave: "bg-green-500 opacity-80",
      button:
        "bg-green-950/40 border border-green-500/30 text-green-400 hover:bg-green-900/30",
      inputBg:
        "bg-[#060805] border border-green-950 text-green-400 placeholder-green-900 focus:border-green-600",
      fontClass: "font-mono text-xs",
    },
  };

  const current = previewThemes[activeTheme];

  useEffect(() => {
    if (!isListening) {
      setSimulatedText(
        activeTheme === "retro"
          ? "READY FOR COMMAND..."
          : "Type a command or click mic...",
      );
      return;
    }

    const phrases = [
      "Jarvish, route to the service page.",
      "Execute documentation lookup.",
      "Open system deployment configurations.",
      "Initialize hands-free voice interface.",
    ];

    let currentIndex = 0;
    setSimulatedText(
      activeTheme === "retro"
        ? `SYS_IN: ${phrases[currentIndex]}`
        : `"${phrases[currentIndex]}"`,
    );

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      setSimulatedText(
        activeTheme === "retro"
          ? `SYS_IN: ${phrases[currentIndex]}`
          : `"${phrases[currentIndex]}"`,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isListening, activeTheme]);

  return (
    <div className="w-full max-w-4xl mx-auto p-1 font-sans">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
          <FiSpeaker className="text-indigo-600" />
          Widget Customizer & Preview
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Simulate, test, and adjust your assistant's design configurations
          before deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Theme Selectors */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Embed Theme Layer
            </label>
            <div className="space-y-2">
              {(Object.keys(previewThemes) as ThemeType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTheme(t)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium capitalize flex items-center justify-between transition-all ${
                    activeTheme === t
                      ? "border-indigo-600 bg-indigo-50/50 text-indigo-700 font-semibold"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {t === "retro" ? (
                      <FiTerminal className="w-4 h-4" />
                    ) : (
                      <FiLayers className="w-4 h-4 opacity-70" />
                    )}
                    {t === "glass"
                      ? "Glassmorphism"
                      : t === "neon"
                        ? "Neon Cyberpunk"
                        : t === "retro"
                          ? "Retro Terminal"
                          : `${t} theme`}
                  </span>
                  {activeTheme === t && (
                    <div className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Simulation States
            </label>
            <button
              onClick={() => setIsListening(!isListening)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium border transition-colors ${
                isListening
                  ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100/70"
                  : "bg-slate-900 border-transparent text-white hover:bg-slate-800"
              }`}
            >
              {isListening ? (
                <>
                  <FiMicOff className="w-4 h-4" /> Stop Voice Mode
                </>
              ) : (
                <>
                  <FiMic className="w-4 h-4" /> Trigger Voice Mode
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Sandbox Container */}
        <div className="lg:col-span-8 flex justify-center items-center bg-slate-100/50 border border-slate-200/60 rounded-3xl p-6 sm:p-12 relative overflow-hidden min-h-[520px]">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 relative overflow-hidden transition-all duration-500 shadow-xl ${current.bg} ${current.cardBorder} ${current.fontClass}`}
          >
            <div
              className={`absolute inset-0 top-0 left-0 w-full h-full -z-10 transition-all duration-500 ${current.overlay}`}
            />

            {/* Top Stats Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h4
                    className={`text-sm font-bold tracking-tight ${current.text}`}
                  >
                    {activeTheme === "retro" ? "JARV_SYS" : "Jarvish"}
                  </h4>
                  <p
                    className={`text-[10px] font-medium opacity-80 ${current.sub}`}
                  >
                    {activeTheme === "retro" ? "V_4.12" : "AI Assistant"}
                  </p>
                </div>
              </div>
              <span
                className={`text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-slate-100/10 border border-current/10 ${current.sub} flex items-center gap-1`}
              >
                <FiRadio className="w-3 h-3" />{" "}
                {activeTheme === "retro" ? "EXEC_ON" : "Live Actions"}
              </span>
            </div>

            {/* Core Fluid Glowing Orb Layout */}
            <div className="my-12 flex flex-col items-center justify-center min-h-[140px]">
              <div className="relative flex items-center justify-center">
                <div
                  className={`absolute w-28 h-28 rounded-full bg-gradient-to-tr ${current.orb} opacity-20 blur-md transition-all duration-500 ${isListening ? "animate-ping scale-110" : "scale-75 opacity-5"}`}
                />
                <div
                  className={`absolute w-24 h-24 rounded-full bg-gradient-to-tr ${current.orb} opacity-30 blur-sm transition-all duration-500 ${isListening ? "animate-pulse" : "scale-90"}`}
                />
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-tr ${current.orb} shadow-md flex items-center justify-center transition-transform duration-500 ${isListening ? "scale-105" : "scale-100"}`}
                />
              </div>

              {/* Responsive Frequency Wavebars */}
              <div className="h-6 flex items-center gap-1 mt-8">
                {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-0.5 rounded-full transition-all duration-300 ${current.wave}`}
                    style={{
                      height: isListening
                        ? `${Math.max(12, val * Math.random() * 6)}px`
                        : "3px",
                      opacity: isListening ? 1 : 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Captions Feedback Block */}
            <div className="text-center px-2 mb-6 min-h-[40px] flex items-center justify-center">
              <p
                className={`text-xs italic font-medium tracking-wide transition-all duration-300 ${isListening ? current.listening : current.sub}`}
              >
                {simulatedText}
              </p>
            </div>

            {/* Action Box */}
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                readOnly
                placeholder={
                  activeTheme === "retro"
                    ? "ENTER COMMAND..."
                    : "Ask Jarvish to perform a task..."
                }
                className={`w-full rounded-xl px-4 py-3 text-xs font-medium outline-none transition-all pr-10 select-none ${current.inputBg}`}
              />
              <button
                disabled
                className={`absolute right-1.5 p-2 rounded-lg transition-all ${current.button}`}
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPreview;
