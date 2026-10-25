import type { User } from "../types";
import {
  FiCreditCard,
  FiCpu,
  FiMessageSquare,
  FiPackage,
  FiZap,
  FiCheck,
  FiArrowUpRight,
  FiCalendar,
  FiActivity 
} from "react-icons/fi";

interface BuillingProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Billing : React.FC<BuillingProps> = ({ user, setUser }) => {
    const currentPlan = (user?.plan || "free").toLowerCase();
    const isFreePlan = currentPlan === "free";

    const messageLimit = Number( 200);
    const messagesUsed = Number( 0);
    const messagesLeft = Math.max(0, messageLimit - messagesUsed);

    const usagePercentage =
        messageLimit > 0
            ? Math.min(100, (messagesUsed / messageLimit) * 100)
            : 0;

    const geminiStatus = user?.geminiStatus || "pending";

    const statusColors =
        geminiStatus === "active"
            ? "bg-emerald-500"
            : geminiStatus === "invalid"
                ? "bg-rose-500"
                : "bg-amber-500";

    const statusTextColors =
        geminiStatus === "active"
            ? "text-emerald-700"
            : geminiStatus === "invalid"
                ? "text-rose-700"
                : "text-amber-700";
    return (
        <>
            <div className="min-h-screen bg-[#f8fafc] font-sans pb-24 relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-indigo-100/60 via-purple-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 relative">

                    {/* Header */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/60 shadow-sm text-sm font-semibold tracking-wide text-slate-700 mb-5">
                            <FiCreditCard className="text-indigo-500" />
                            Workspace Billing
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                            Manage Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500">
                                Subscription
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-500 mt-4 max-w-2xl font-medium leading-relaxed">
                            Manage your plan, monitor AI usage, and choose the right plan for
                            your business.
                        </p>
                    </div>

                    {/* Section 1: Account Overview */}
                    <section className="mb-14">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <FiActivity className="w-5 h-5" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Account Overview
                                </h2>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    Your current subscription and usage at a glance.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                            {/* Current Plan Card */}
                            <div className="group bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-70 group-hover:scale-150 transition-transform duration-500" />

                                <div className="relative">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <FiPackage className="w-6 h-6" />
                                    </div>

                                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                        Current Plan
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <h3 className="text-2xl font-extrabold text-slate-900 capitalize">
                                            {currentPlan}
                                        </h3>

                                        <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            Active
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                                        {isFreePlan
                                            ? "You're currently using the free Jarvish plan."
                                            : "Your upgraded plan is currently selected."}
                                    </p>
                                </div>
                            </div>

                            {/* Gemini Status Card */}
                            <div className="group bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-100/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-50 rounded-full blur-2xl opacity-70 group-hover:scale-150 transition-transform duration-500" />

                                <div className="relative">
                                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <FiCpu className="w-6 h-6" />
                                    </div>

                                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                        Gemini Status
                                    </p>

                                    <div className="flex items-center gap-2 mt-3">
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full ${statusColors} ${geminiStatus === "active" ? "animate-pulse" : ""
                                                }`}
                                        />

                                        <h3
                                            className={`text-xl font-extrabold capitalize ${statusTextColors}`}
                                        >
                                            {geminiStatus}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                                        {geminiStatus === "active"
                                            ? "Your Gemini connection is active."
                                            : geminiStatus === "invalid"
                                                ? "Check your Gemini API key configuration."
                                                : "Your Gemini connection needs attention or verification."}
                                    </p>
                                </div>
                            </div>

                            {/* Usage Card */}
                            <div className="group bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden sm:col-span-2 lg:col-span-1">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-2xl opacity-70 group-hover:scale-150 transition-transform duration-500" />

                                <div className="relative">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <FiMessageSquare className="w-6 h-6" />
                                    </div>

                                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                        Messages Left
                                    </p>

                                    <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
                                        {messagesLeft.toLocaleString()}
                                        <span className="text-sm font-semibold text-slate-400 ml-2">
                                            / {messageLimit.toLocaleString()}
                                        </span>
                                    </h3>

                                    <div className="h-2.5 w-full rounded-full bg-slate-100 mt-5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 transition-all duration-700"
                                            style={{ width: `${100 - usagePercentage}%` }}
                                        />
                                    </div>

                                    <p className="text-xs text-slate-400 mt-3 font-medium">
                                        {messagesUsed.toLocaleString()} used ·{" "}
                                        {messagesLeft.toLocaleString()} remaining
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section 2: Available Plans */}
                    <section>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                        <FiZap className="w-5 h-5" />
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Choose Your Plan
                                    </h2>
                                </div>

                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Start with the basics or upgrade to unlock more possibilities.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Free Plan */}
                            <div className="group bg-white p-8 sm:p-9 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-36 h-36 bg-slate-50 rounded-bl-[100%] transition-transform duration-500 group-hover:scale-125" />

                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <FiPackage className="w-7 h-7" />
                                    </div>

                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                                        Get Started
                                    </p>

                                    <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                                        Free Plan
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-sm">
                                        Explore Jarvish and build your AI assistant with the essential
                                        features to get started.
                                    </p>

                                    <div className="flex items-baseline gap-2 mt-7">
                                        <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                                            ₹0
                                        </span>
                                        <span className="text-sm font-medium text-slate-400">
                                            / month
                                        </span>
                                    </div>

                                    <div className="h-px bg-slate-100 my-7" />

                                    <p className="text-sm font-bold text-slate-800 mb-4">
                                        What's included
                                    </p>

                                    <ul className="space-y-4 text-sm text-slate-600">
                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            AI assistant configuration
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            Basic website integration
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            Limited AI message usage
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            Customizable assistant appearance
                                        </li>
                                    </ul>

                                    <button
                                        type="button"
                                        disabled={isFreePlan}
                                        className={`w-full mt-9 py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 ${isFreePlan
                                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                            : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
                                            }`}
                                    >
                                        {isFreePlan ? "Your Current Plan" : "Select Free Plan"}
                                    </button>
                                </div>
                            </div>

                            {/* Pro Plan */}
                            <div className="group bg-white p-8 sm:p-9 rounded-[2.5rem] border border-indigo-200/80 shadow-md shadow-indigo-100/40 hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                {/* Decorative Gradient */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 rounded-bl-[100%] group-hover:scale-125 transition-transform duration-500" />

                                <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-indigo-200">
                                    <FiZap className="w-3 h-3" />
                                    Recommended
                                </div>

                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-400 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-200/60 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <FiZap className="w-7 h-7" />
                                    </div>

                                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em]">
                                        Grow Your Business
                                    </p>

                                    <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                                        Pro Plan
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-sm">
                                        Unlock more capacity and advanced capabilities as your business
                                        and customer interactions grow.
                                    </p>

                                    <div className="flex items-baseline gap-2 mt-7">
                                        <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                                            ₹499
                                        </span>
                                        <span className="text-sm font-medium text-slate-400">
                                            / month
                                        </span>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-indigo-100 via-slate-100 to-transparent my-7" />

                                    <p className="text-sm font-bold text-slate-800 mb-4">
                                        Everything in Free, plus
                                    </p>

                                    <ul className="space-y-4 text-sm text-slate-600">
                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            Higher message allowance
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            Advanced assistant customization
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            Increased capacity for customer conversations
                                        </li>

                                        <li className="flex items-start gap-3">
                                            <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mt-0.5">
                                                <FiCheck className="w-3.5 h-3.5" />
                                            </span>
                                            More room to scale your assistant
                                        </li>
                                    </ul>

                                    <button
                                        type="button"
                                        disabled={!isFreePlan}
                                        onClick={() => {
                                            // Connect your payment or subscription-upgrade flow here.
                                        }}
                                        className={`group/button w-full mt-9 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${!isFreePlan
                                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg shadow-indigo-200/60 hover:shadow-xl hover:shadow-indigo-300/60 hover:-translate-y-0.5 active:scale-[0.98]"
                                            }`}
                                    >
                                        {!isFreePlan ? "Pro Plan Active" : "Upgrade to Pro"}
                                        {isFreePlan && (
                                            <FiArrowUpRight className="w-4 h-4 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Billing Note */}
                    <div className="mt-8 flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                        <div className="shrink-0 mt-0.5 p-2 rounded-xl bg-indigo-50 text-indigo-600">
                            <FiCalendar className="w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-slate-900">
                                Need help with billing?
                            </p>
                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                Your subscription and usage details will appear here. Connect your
                                payment provider and usage tracking to keep this information up to
                                date.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Billing
