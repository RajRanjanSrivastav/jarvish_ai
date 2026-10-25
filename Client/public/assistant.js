/**
 * Jarvish AI - Embeddable Widget Script
 * Industry Standard Implementation using Shadow DOM for style encapsulation.
 * Native Vanilla JavaScript - Runs directly in the browser.
 */

// class JarvishWidget {
//   constructor() {
//     this.userId = null;
//     this.isOpen = false;
//     this.apiBaseUrl = "https://api.jarvish.ai/v1"; // Replace with your actual backend URL

//     // 1. Initialize container and attach Shadow DOM to isolate CSS
//     this.container = document.createElement("div");
//     this.container.id = "jarvish-widget-container";
//     this.shadowRoot = this.container.attachShadow({ mode: "open" });

//     // 2. Start the initialization process
//     this.init();
//   }

//   async init() {
//     // Extract the data-user-id from the script tag that loaded this file
//     const scriptTag =
//       document.currentScript ||
//       document.querySelector('script[src*="assistant"]');
//     if (scriptTag) {
//       this.userId = scriptTag.getAttribute("data-assistant-id");
//     }

//     if (!this.userId) {
//       console.error("Jarvish AI: Initialization failed. Missing data-user-id.");
//       return;
//     }

//     // Optional: Fetch assistant configuration from your backend using this.userId
//     // const config = await fetch(`${this.apiBaseUrl}/assistant/${this.userId}`).then(res => res.json());

//     // 3. Render the UI
//     this.render();
//     this.attachEventListeners();

//     // 4. Inject into the host website
//     document.body.appendChild(this.container);
//   }

//   render() {
//     // We use a premium "Glassmorphism" theme here by default to match your Builder preview.
//     const template = `
//       <style>
//         /* Modern CSS Reset inside Shadow DOM */
//         :host {
//           all: initial; /* Blocks inherited styles from host site */
//           font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//           --primary: #4f46e5; /* Indigo 600 */
//           --primary-hover: #4338ca; /* Indigo 700 */
//           --text-main: #0f172a; /* Slate 900 */
//           --text-muted: #64748b; /* Slate 500 */
//         }

//         /* Widget Positioning */
//         .jarvish-wrapper {
//           position: fixed;
//           bottom: 24px;
//           right: 24px;
//           z-index: 999999;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//         }

//         /* Floating Action Button (The Orb) */
//         .jarvish-fab {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #4f46e5, #14b8a6); /* Indigo to Teal */
//           border: none;
//           box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
//           position: relative;
//         }

//         .jarvish-fab:hover {
//           transform: scale(1.08);
//           box-shadow: 0 14px 30px rgba(79, 70, 229, 0.5);
//         }

//         /* FAB Icon Animation */
//         .jarvish-fab svg {
//           width: 28px;
//           height: 28px;
//           fill: white;
//           transition: transform 0.3s ease, opacity 0.3s ease;
//         }
//         .icon-open { display: none; }
//         .is-close { display: none; }
//         .is-open .icon-closed { display: none; }
//         .is-open .icon-open { display: block; }

//         /* Chat Window (Glassmorphism) */
//         .jarvish-window {
//           width: 380px;
//           height: 600px;
//           max-height: calc(100vh - 120px);
//           max-width: calc(100vw - 48px);
//           background: rgba(255, 255, 255, 0.85);
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           border: 1px solid rgba(255, 255, 255, 0.5);
//           border-radius: 24px;
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.02);
//           margin-bottom: 20px;
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;

//           /* Animation */
//           opacity: 0;
//           transform: translateY(20px) scale(0.95);
//           pointer-events: none;
//           transform-origin: bottom right;
//           transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//         }

//         .is-open .jarvish-window {
//           opacity: 1;
//           transform: translateY(0) scale(1);
//           pointer-events: all;
//         }

//         /* Window Header */
//         .jarvish-header {
//           padding: 20px;
//           background: linear-gradient(to right, rgba(248, 250, 252, 0.9), rgba(255, 255, 255, 0.9));
//           border-bottom: 1px solid rgba(226, 232, 240, 0.8);
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .header-avatar {
//           width: 10px;
//           height: 10px;
//           background: #10b981; /* Emerald ping */
//           border-radius: 50%;
//           box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
//           animation: pulse 2s infinite;
//         }

//         @keyframes pulse {
//           0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
//           70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
//         }

//         .header-text h3 {
//           margin: 0;
//           font-size: 16px;
//           font-weight: 700;
//           color: var(--text-main);
//         }
//         .header-text p {
//           margin: 2px 0 0 0;
//           font-size: 12px;
//           color: var(--text-muted);
//           font-weight: 500;
//         }

//         /* Messages Area */
//         .jarvish-messages {
//           flex: 1;
//           padding: 20px;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .message {
//           max-width: 85%;
//           padding: 12px 16px;
//           border-radius: 18px;
//           font-size: 14px;
//           line-height: 1.5;
//         }

//         .message.bot {
//           background: white;
//           color: var(--text-main);
//           align-self: flex-start;
//           border-bottom-left-radius: 4px;
//           box-shadow: 0 2px 5px rgba(0,0,0,0.02);
//           border: 1px solid rgba(226, 232, 240, 0.5);
//         }

//         .message.user {
//           background: var(--primary);
//           color: white;
//           align-self: flex-end;
//           border-bottom-right-radius: 4px;
//           box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
//         }

//         /* Input Area */
//         .jarvish-input-area {
//           padding: 16px;
//           background: rgba(255, 255, 255, 0.5);
//           border-top: 1px solid rgba(226, 232, 240, 0.8);
//           display: flex;
//           gap: 8px;
//         }

//         .jarvish-input {
//           flex: 1;
//           padding: 12px 16px;
//           border-radius: 99px;
//           border: 1px solid #e2e8f0;
//           background: white;
//           font-size: 14px;
//           outline: none;
//           transition: border-color 0.2s;
//         }
//         .jarvish-input:focus { border-color: var(--primary); }

//         .jarvish-send {
//           width: 44px;
//           height: 44px;
//           border-radius: 50%;
//           background: var(--primary);
//           color: white;
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: background 0.2s;
//         }
//         .jarvish-send:hover { background: var(--primary-hover); }
//         .jarvish-send svg { width: 18px; height: 18px; fill: currentColor; }

//       </style>

//       <div class="jarvish-wrapper" id="wrapper">
//         <!-- Chat Window -->
//         <div class="jarvish-window">
//           <div class="jarvish-header">
//             <div class="header-avatar"></div>
//             <div class="header-text">
//               <h3 id="bot-name">Jarvish AI</h3>
//               <p>Typically replies instantly</p>
//             </div>
//           </div>

//           <div class="jarvish-messages" id="messages-container">
//             <div class="message bot">
//               Hello! I'm Jarvish. How can I help you today?
//             </div>
//           </div>

//           <div class="jarvish-input-area">
//             <input type="text" id="chat-input" class="jarvish-input" placeholder="Type your message..." />
//             <button id="send-btn" class="jarvish-send">
//               <!-- Send Icon -->
//               <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
//             </button>
//           </div>
//         </div>

//         <!-- Floating Action Button -->
//         <button class="jarvish-fab" id="fab-btn" aria-label="Toggle AI Assistant">
//           <!-- Sparkles Icon (Closed state) -->
//           <svg class="icon-closed" viewBox="0 0 24 24"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/></svg>
//           <!-- X Icon (Open state) -->
//           <svg class="icon-open" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
//         </button>
//       </div>
//     `;

//     this.shadowRoot.innerHTML = template;
//   }

//   attachEventListeners() {
//     const wrapper = this.shadowRoot.getElementById("wrapper");
//     const fabBtn = this.shadowRoot.getElementById("fab-btn");
//     const sendBtn = this.shadowRoot.getElementById("send-btn");
//     const chatInput = this.shadowRoot.getElementById("chat-input");

//     // Toggle Window
//     fabBtn?.addEventListener("click", () => {
//       this.isOpen = !this.isOpen;
//       if (this.isOpen) {
//         wrapper?.classList.add("is-open");
//         // wrapper?.classList.remove("is-close");
//         setTimeout(() => chatInput.focus(), 300);
//       } else {
//         wrapper?.classList.remove("is-open");
//         // wrapper?.classList.add("is-close");
//       }
//     });

//     // Send Message
//     const handleSend = () => {
//       const text = chatInput.value.trim();
//       if (!text) return;

//       this.appendMessage(text, "user");
//       chatInput.value = "";

//       // MOCK: Simulate Bot Typing/Response logic here
//       // You would send `text` to your backend via API here.
//       setTimeout(() => {
//         this.appendMessage("I am processing your request...", "bot");
//       }, 1000);
//     };

//     sendBtn?.addEventListener("click", handleSend);
//     chatInput?.addEventListener("keypress", (e) => {
//       if (e.key === "Enter") handleSend();
//     });
//   }

//   appendMessage(text, sender) {
//     const container = this.shadowRoot.getElementById("messages-container");
//     if (!container) return;

//     const msgDiv = document.createElement("div");
//     msgDiv.className = `message ${sender}`;
//     msgDiv.textContent = text;

//     container.appendChild(msgDiv);
//     // Auto-scroll to bottom
//     container.scrollTop = container.scrollHeight;
//   }
// }

// new JarvishWidget();

// ------------------------------------------------------

// (() => {
//   "use strict";

//   const WIDGET_VERSION = "1.0.0";
//   const DEFAULT_API_BASE = "http://localhost:5100/api/assistant";
//   const DEFAULTS = {
//     name: "AI Assistant",
//     welcomeMessage: "Hi! How can I help you today?",
//     placeholder: "Type your message...",
//     statusText: "Here to help",
//     theme: {
//       mode: "light",
//       primaryColor: "#4F46E5",
//       position: "bottom-right",
//     },
//   };

//   class JarvishWidget {
//     constructor(scriptTag) {
//       this.scriptTag = scriptTag;
//       this.assistantId = scriptTag?.getAttribute("data-assistant-id")?.trim();
//       this.apiBaseUrl = (
//         scriptTag?.getAttribute("data-api-base") || DEFAULT_API_BASE
//       ).replace(/\/+$/, "");
//       this.config = null;
//       this.isOpen = false;
//       this.isSending = false;
//       this.messages = [];
//       this.abortController = null;

//       if (!this.assistantId) {
//         console.error(
//           "Jarvish AI: missing data-assistant-id on the embed script.",
//         );
//         return;
//       }

//       this.container = document.createElement("div");
//       this.container.id = `jarvish-widget-${this.safeId(this.assistantId)}`;
//       this.container.setAttribute("data-jarvish-widget", WIDGET_VERSION);
//       this.shadowRoot = this.container.attachShadow({ mode: "open" });
//       this.init();
//     }

//     safeId(value) {
//       return (
//         String(value)
//           .replace(/[^a-zA-Z0-9_-]/g, "")
//           .slice(0, 32) || "assistant"
//       );
//     }

//     async init() {
//       this.renderLoading();

//       try {
//         const response = await fetch(
//           `${this.apiBaseUrl}/${encodeURIComponent(this.assistantId)}/public`,
//           {
//             method: "GET",
//             headers: { Accept: "application/json" },
//             credentials: "omit",
//           },
//         );

//         if (!response.ok) {
//           throw new Error(
//             response.status === 404
//               ? "This assistant could not be found."
//               : "We couldn't load this assistant.",
//           );
//         }

//         const payload = await response.json();
//         if (!payload?.success || !payload?.assistant) {
//           throw new Error("The assistant configuration is invalid.");
//         }

//         this.config = this.normalizeConfig(payload.assistant);

//         if (this.config.enabled === false) {
//           throw new Error("This assistant is currently unavailable.");
//         }

//         this.render();
//         this.applyConfig();
//         this.bindEvents();

//         if (document.body) {
//           document.body.appendChild(this.container);
//         } else {
//           document.addEventListener(
//             "DOMContentLoaded",
//             () => document.body.appendChild(this.container),
//             { once: true },
//           );
//         }
//       } catch (error) {
//         console.error("Jarvish AI initialization failed:", error);
//         this.renderUnavailable(error.message);
//       }
//     }

//     normalizeConfig(raw) {
//       const inputTheme =
//         raw.theme && typeof raw.theme === "object" ? raw.theme : {};

//       const validColors = new Set([
//         "#4F46E5",
//         "#4338CA",
//         "#2563EB",
//         "#0D9488",
//         "#059669",
//         "#7C3AED",
//         "#DB2777",
//         "#EA580C",
//         "#0F766E",
//         "#1D4ED8",
//         "#111827",
//       ]);
//       const proposedColor = String(
//         inputTheme.primaryColor || DEFAULTS.theme.primaryColor,
//       ).toUpperCase();
//       const primaryColor = validColors.has(proposedColor)
//         ? proposedColor
//         : DEFAULTS.theme.primaryColor;

//       return {
//         id: String(raw.id || this.assistantId),
//         name: this.cleanText(raw.name, 80) || DEFAULTS.name,
//         welcomeMessage:
//           this.cleanText(raw.welcomeMessage, 500) || DEFAULTS.welcomeMessage,
//         placeholder:
//           this.cleanText(raw.placeholder, 100) || DEFAULTS.placeholder,
//         statusText: this.cleanText(raw.statusText, 80) || DEFAULTS.statusText,
//         enabled: raw.enabled !== false,
//         // Voice is opt-in at the assistant-config level. If the backend omits
//         // this field, keep voice enabled for backward compatibility.
//         enableVoice: raw.enableVoice !== false,
//         voiceLanguage: this.cleanText(raw.voiceLanguage, 20) || "en-IN",
//         theme: {
//           mode: inputTheme.mode === "dark" ? "dark" : "light",
//           primaryColor,
//           position:
//             inputTheme.position === "bottom-left"
//               ? "bottom-left"
//               : "bottom-right",
//         },
//       };
//     }

//     cleanText(value, maxLength) {
//       if (typeof value !== "string") return "";
//       return value.trim().slice(0, maxLength);
//     }

//     loadStylesheet() {
//       const cssUrl =
//         this.scriptTag?.getAttribute("data-css-url") ||
//         new URL("widget.css", this.scriptTag.src || document.baseURI).href;

//       const link = document.createElement("link");
//       link.rel = "stylesheet";
//       link.href = cssUrl;
//       link.crossOrigin = "anonymous";
//       this.shadowRoot.appendChild(link);
//     }

//     renderLoading() {
//       this.shadowRoot.innerHTML = `
//         <div class="jw-loading" role="status" aria-live="polite">
//           Loading assistant…
//         </div>
//       `;
//       this.loadStylesheet();
//     }

//     renderUnavailable(message) {
//       // Keep a small, non-intrusive notice in the page; don't expose server details.
//       this.shadowRoot.innerHTML = `
//         <div class="jw-unavailable" role="status">
//           <span>Chat support is temporarily unavailable.</span>
//         </div>
//       `;
//       this.loadStylesheet();
//       console.warn("Jarvish AI:", message);
//     }

//     render() {
//       this.shadowRoot.innerHTML = `
//         <div class="jw-root">
//           <section class="jw-panel" id="jw-panel" aria-label="Chat assistant" aria-hidden="true">
//             <header class="jw-header">
//               <div class="jw-brand">
//                 <div class="jw-avatar" aria-hidden="true">✦</div>
//                 <div class="jw-heading">
//                   <div class="jw-title" id="jw-title"></div>
//                   <div class="jw-status">
//                     <span class="jw-status-dot" aria-hidden="true"></span>
//                     <span id="jw-status-text"></span>
//                   </div>
//                 </div>
//               </div>
//               <button class="jw-close" id="jw-close" type="button" aria-label="Close chat">
//                 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.71 17 4.4l-5 5-5-5-1.3 1.31 5 5-5 5L7 17.02l5-5 5 5 1.3-1.31-5-5z"/></svg>
//               </button>
//             </header>

//             <div class="jw-messages" id="jw-messages" role="log" aria-live="polite" aria-relevant="additions text">
//               <div class="jw-message jw-message--bot" id="jw-welcome"></div>
//             </div>

//             <div class="jw-error" id="jw-error" role="alert" hidden></div>

//             <form class="jw-composer" id="jw-form">
//               <label class="jw-sr-only" for="jw-input">Your message</label>
//               <input id="jw-input" class="jw-input" type="text" maxlength="2000"
//                 autocomplete="off" placeholder="Type your message..." />
//                 <button
//                   class="jw-mic"
//                   type="button"
//                   aria-label="Speak your message"
//                   title="Speak your message"
//                 >
//                   <svg viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"/>
//                     <path d="M19 11a7 7 0 0 1-14 0M12 18v4m-4 0h8"
//                       fill="none" stroke="currentColor"
//                       stroke-width="2" stroke-linecap="round"/>
//                   </svg>
//                 </button>
//               <button id="jw-send" class="jw-send" type="submit" aria-label="Send message">
//                 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 21 23 12 2 3l.01 7L17 12 2.01 14z"/></svg>
//               </button>
//             </form>
//             <div class="jw-footer">Powered by Jarvish AI</div>
//           </section>

//           <button class="jw-launcher" id="jw-launcher" type="button"
//             aria-label="Open chat" aria-expanded="false" aria-controls="jw-panel">
//             <svg class="jw-launcher-open" viewBox="0 0 24 24" aria-hidden="true">
//               <path d="M12 3c-5 0-9 3.6-9 8 0 2.1.9 4 2.5 5.4L5 21l4.8-2.2c.7.2 1.4.2 2.2.2 5 0 9-3.6 9-8s-4-8-9-8zm-4 7h8v2H8z"/>
//             </svg>
//             <svg class="jw-launcher-close" viewBox="0 0 24 24" aria-hidden="true">
//               <path d="m18.3 5.7-1.4-1.4-4.9 5-4.9-5-1.4 1.4 5 5-5 5 1.4 1.4 4.9-5 4.9 5 1.4-1.4-5-5z"/>
//             </svg>
//           </button>
//         </div>
//       `;

//       this.loadStylesheet();
//     }

//     applyConfig() {
//       const config = this.config;
//       const theme = config.theme;
//       const hostStyle = this.container.style;

//       hostStyle.setProperty("--jw-primary", theme.primaryColor);
//       hostStyle.setProperty(
//         "--jw-primary-hover",
//         this.darkenColor(theme.primaryColor),
//       );
//       hostStyle.setProperty(
//         "--jw-position-left",
//         theme.position === "bottom-left" ? "24px" : "auto",
//       );
//       hostStyle.setProperty(
//         "--jw-position-right",
//         theme.position === "bottom-right" ? "24px" : "auto",
//       );

//       this.container.classList.toggle("jw-theme-dark", theme.mode === "dark");

//       const title = this.shadowRoot.getElementById("jw-title");
//       const status = this.shadowRoot.getElementById("jw-status-text");
//       const welcome = this.shadowRoot.getElementById("jw-welcome");
//       const input = this.shadowRoot.getElementById("jw-input");

//       if (title) title.textContent = config.name;
//       if (status) status.textContent = config.statusText;
//       if (welcome) welcome.textContent = config.welcomeMessage;
//       if (input) input.placeholder = config.placeholder;

//       // Respect the builder setting. Text chat still works when voice is off.
//       const micButton = this.shadowRoot.querySelector(".jw-mic");
//       if (micButton) micButton.hidden = !config.enableVoice;
//     }

//     darkenColor(hex) {
//       const colors = {
//         "#4F46E5": "#4338CA",
//         "#4338CA": "#3730A3",
//         "#2563EB": "#1D4ED8",
//         "#0D9488": "#0F766E",
//         "#059669": "#047857",
//         "#7C3AED": "#6D28D9",
//         "#DB2777": "#BE185D",
//         "#EA580C": "#C2410C",
//         "#0F766E": "#115E59",
//         "#1D4ED8": "#1E40AF",
//         "#111827": "#030712",
//       };
//       return colors[hex.toUpperCase()] || "#4338CA";
//     }

//     bindEvents() {
//       const launcher = this.shadowRoot.getElementById("jw-launcher");
//       const close = this.shadowRoot.getElementById("jw-close");
//       const form = this.shadowRoot.getElementById("jw-form");
//       const input = this.shadowRoot.getElementById("jw-input");

//       launcher.addEventListener("click", () => this.toggleOpen());
//       close.addEventListener("click", () => this.setOpen(false));
//       form.addEventListener("submit", (event) => {
//         event.preventDefault();
//         this.sendMessage();
//       });

//       this.shadowRoot.addEventListener("keydown", (event) => {
//         if (event.key === "Escape" && this.isOpen) this.setOpen(false);
//       });

//       // Avoid focus stealing when the widget initializes.
//       input.addEventListener("keydown", (event) => {
//         if (event.key === "Enter" && event.shiftKey) event.preventDefault();
//       });

//       // Initialize microphone input only after the widget markup exists.
//       this.setupVoice();
//     }

//     toggleOpen() {
//       this.setOpen(!this.isOpen);
//     }

//     setOpen(open) {
//       this.isOpen = open;
//       const panel = this.shadowRoot.getElementById("jw-panel");
//       const launcher = this.shadowRoot.getElementById("jw-launcher");
//       if (!panel || !launcher) return;

//       panel.classList.toggle("jw-panel--open", open);
//       panel.setAttribute("aria-hidden", String(!open));
//       launcher.setAttribute("aria-expanded", String(open));
//       launcher.setAttribute("aria-label", open ? "Close chat" : "Open chat");
//       this.container.classList.toggle("jw-is-open", open);

//       if (open) {
//         this.shadowRoot.getElementById("jw-input")?.focus();
//       } else {
//         // Do not keep listening or speaking after the visitor closes the chat.
//         this.stopListening();
//         this.stopSpeaking();
//       }
//     }

//     setError(message) {
//       const error = this.shadowRoot.getElementById("jw-error");
//       if (!error) return;
//       error.textContent = message || "";
//       error.hidden = !message;
//     }

//     appendMessage(text, role) {
//       const container = this.shadowRoot.getElementById("jw-messages");
//       if (!container) return null;

//       const element = document.createElement("div");
//       element.className = `jw-message ${role === "user" ? "jw-message--user" : "jw-message--bot"}`;
//       element.textContent = text;
//       container.appendChild(element);
//       container.scrollTop = container.scrollHeight;
//       return element;
//     }

//     setupVoice() {
//       this.speechRecognition = null;
//       this.isListening = false;
//       this.micButton = this.shadowRoot.querySelector(".jw-mic");
//       this.input = this.shadowRoot.querySelector(".jw-input");

//       if (!this.micButton || !this.input || !this.config?.enableVoice) return;

//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;

//       if (!SpeechRecognition) {
//         this.micButton.disabled = true;
//         this.micButton.title =
//           "Speech recognition is not supported in this browser. Try a recent version of Chrome or Edge.";
//         this.micButton.setAttribute("aria-label", this.micButton.title);
//         return;
//       }

//       const recognition = new SpeechRecognition();
//       recognition.lang = this.config.voiceLanguage || "en-IN";
//       recognition.continuous = false;
//       recognition.interimResults = true;
//       this.speechRecognition = recognition;

//       recognition.onstart = () => {
//         this.isListening = true;
//         this.micButton.classList.add("jw-mic--listening");
//         this.micButton.setAttribute("aria-label", "Stop listening");
//         this.micButton.title = "Stop listening";
//         this.setError("");
//       };

//       recognition.onresult = (event) => {
//         // Combine the results returned for this recognition session.
//         let transcript = "";
//         for (let i = 0; i < event.results.length; i++) {
//           transcript += event.results[i][0].transcript;
//         }
//         this.input.value = transcript.trim();
//       };

//       recognition.onerror = (event) => {
//         const messages = {
//           "not-allowed": "Microphone access was blocked. Allow microphone access in your browser settings.",
//           "service-not-allowed": "Speech recognition is blocked by this browser or device.",
//           "no-speech": "No speech was detected. Please try again.",
//           network: "Speech recognition needs a working network connection in this browser.",
//           "audio-capture": "No working microphone was found.",
//         };
//         if (event.error !== "aborted") {
//           this.setError(messages[event.error] || "Voice input could not start. Please type your message instead.");
//         }
//       };

//       recognition.onend = () => {
//         this.isListening = false;
//         this.micButton?.classList.remove("jw-mic--listening");
//         this.micButton?.setAttribute("aria-label", "Speak your message");
//         if (this.micButton) this.micButton.title = "Speak your message";
//       };

//       this.micButton.addEventListener("click", () => {
//         if (this.isListening) {
//           recognition.stop();
//           return;
//         }
//         try {
//           this.setError("");
//           recognition.start();
//         } catch (error) {
//           // start() can throw if called twice before the previous session ends.
//           console.warn("Jarvish AI: could not start speech recognition.", error);
//         }
//       });
//     }

//     stopListening() {
//       if (this.speechRecognition && this.isListening) {
//         try {
//           this.speechRecognition.stop();
//         } catch (_) {
//           // The browser may already have ended the recognition session.
//         }
//       }
//     }

//     speakText(text) {
//       if (!this.config?.enableVoice || !("speechSynthesis" in window)) return;
//       const cleanText = String(text || "").trim();
//       if (!cleanText) return;

//       // Cancel the previous utterance so two replies do not overlap.
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(cleanText);
//       utterance.lang = this.config.voiceLanguage || "en-IN";
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.volume = 1;
//       window.speechSynthesis.speak(utterance);
//     }

//     stopSpeaking() {
//       if ("speechSynthesis" in window) window.speechSynthesis.cancel();
//     }

//     addSpeakButton(messageElement, messageText) {
//       if (!messageElement || !this.config?.enableVoice || !("speechSynthesis" in window)) return;

//       const button = document.createElement("button");
//       button.type = "button";
//       button.className = "jw-speak";
//       button.setAttribute("aria-label", "Read this reply aloud");
//       button.title = "Read this reply aloud";
//       button.innerHTML = `
//         <svg viewBox="0 0 24 24" aria-hidden="true">
//           <path d="M3 9v6h4l5 4V5L7 9H3Z" fill="currentColor"/>
//           <path d="M16 9a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
//         </svg>`;
//       button.addEventListener("click", () => this.speakText(messageText));
//       messageElement.appendChild(button);
//     }

//     setSending(sending) {
//       this.isSending = sending;
//       const button = this.shadowRoot.getElementById("jw-send");
//       const input = this.shadowRoot.getElementById("jw-input");
//       if (button) button.disabled = sending;
//       if (input) input.disabled = sending;
//       if (button) button.setAttribute("aria-busy", String(sending));
//     }

//     async sendMessage() {
//       if (this.isSending) return;

//       const input = this.shadowRoot.getElementById("jw-input");
//       const message = input?.value.trim();
//       if (!message) return;

//       this.setError("");
//       this.appendMessage(message, "user");
//       input.value = "";
//       this.setSending(true);

//       const typing = this.appendMessage("Thinking…", "bot");
//       typing?.classList.add("jw-message--typing");

//       try {
//         this.abortController = new AbortController();
//         const response = await fetch(`${this.apiBaseUrl}/chat`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           credentials: "omit",
//           signal: this.abortController.signal,
//           body: JSON.stringify({
//             assistantId: this.assistantId,
//             message,
//           }),
//         });

//         const payload = await response.json().catch(() => ({}));
//         if (!response.ok) {
//           throw new Error(payload.message || "Unable to send your message.");
//         }

//         const answer =
//           typeof payload.reply === "string"
//             ? payload.reply
//             : typeof payload.response === "string"
//               ? payload.response
//               : typeof payload.message === "string"
//                 ? payload.message
//                 : "";

//         if (!answer)
//           throw new Error("The assistant returned an empty response.");

//         if (typing) typing.textContent = answer;
//         typing?.classList.remove("jw-message--typing");
//         // Add an explicit speaker control; replies are not spoken unexpectedly.
//         this.addSpeakButton(typing, answer);
//       } catch (error) {
//         typing?.remove();
//         if (error?.name !== "AbortError") {
//           this.setError(
//             "Sorry, we couldn't send that message. Please try again.",
//           );
//           console.error("Jarvish AI chat error:", error);
//         }
//       } finally {
//         this.abortController = null;
//         this.setSending(false);
//         input?.focus();
//       }
//     }
//   }

//   // `document.currentScript` is captured synchronously while this script executes.
//   const scriptTag = document.currentScript;
//   if (!scriptTag) {
//     console.error("Jarvish AI: unable to identify the embed script.");
//     return;
//   }

//   // Prevent accidental duplicate initialization for the same script element.
//   if (scriptTag.dataset.jarvishInitialized === "true") return;
//   scriptTag.dataset.jarvishInitialized = "true";
//   new JarvishWidget(scriptTag);
// })();

// -----------------------------------------------------

(() => {
  "use strict";

  const WIDGET_VERSION = "2.0.0";
  const DEFAULT_API_BASE = "http://localhost:5100/api/assistant";

  const VALID_THEMES = new Set(["light", "glass", "dark", "neon", "retro"]);

  const DEFAULTS = {
    assistantName: "Jarvish",
    businessName: "AI Assistant",
    welcomeMessage: "Hi! How can I help you today?",
    placeholder: "Ask Jarvish to perform a task...",
    statusText: "Live Actions",
    tone: "friendly",
    theme: "glass",
    enableVoice: true,
    enableNavigation: true,
    voiceLanguage: "en-IN",
    position: "bottom-right",
  };

  class JarvishWidget {
    constructor(scriptTag) {
      this.scriptTag = scriptTag;
      this.assistantId = scriptTag?.getAttribute("data-assistant-id")?.trim();
      this.apiBaseUrl = (
        scriptTag?.getAttribute("data-api-base") || DEFAULT_API_BASE
      ).replace(/\/+$/, "");

      this.config = null;
      this.isOpen = false;
      this.isSending = false;
      this.isListening = false;
      this.isSpeaking = false;
      this.hasGreeted = false;
      this.abortController = null;
      this.waveInterval = null;
      this.finalTranscript = "";

      if (!this.assistantId) {
        console.error(
          "Jarvish AI: missing data-assistant-id on the embed script.",
        );
        return;
      }

      this.container = document.createElement("div");
      this.container.id = `jarvish-widget-${this.safeId(this.assistantId)}`;
      this.container.setAttribute("data-jarvish-widget", WIDGET_VERSION);
      this.shadowRoot = this.container.attachShadow({ mode: "open" });

      this.init();
    }

    safeId(value) {
      return (
        String(value)
          .replace(/[^a-zA-Z0-9_-]/g, "")
          .slice(0, 32) || "assistant"
      );
    }

    async init() {
      this.renderLoading();

      try {
        const response = await fetch(
          `${this.apiBaseUrl}/${encodeURIComponent(this.assistantId)}/public`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "omit",
          },
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "This assistant could not be found."
              : "We couldn't load this assistant.",
          );
        }

        const payload = await response.json();
        // Support both { success: true, assistant: {...} } and direct document {...}
        const rawData = payload?.assistant || payload?.data || payload;

        if (!rawData || payload?.success === false) {
          throw new Error("The assistant configuration is invalid.");
        }

        this.config = this.normalizeConfig(rawData);

        if (this.config.enabled === false) {
          throw new Error("This assistant is currently unavailable.");
        }

        this.render();
        this.applyConfig();
        this.bindEvents();

        if (document.body) {
          document.body.appendChild(this.container);
        } else {
          document.addEventListener(
            "DOMContentLoaded",
            () => document.body.appendChild(this.container),
            { once: true },
          );
        }
      } catch (error) {
        console.error("Jarvish AI initialization failed:", error);
        this.renderUnavailable(error.message);
      }
    }

    normalizeConfig(raw) {
      // Handle theme whether it's a string ("dark") or an object ({ mode: "dark" })
      let rawThemeName = "glass";
      let position = DEFAULTS.position;

      if (typeof raw.theme === "string") {
        rawThemeName = raw.theme.toLowerCase().trim();
      } else if (raw.theme && typeof raw.theme === "object") {
        rawThemeName = String(raw.theme.mode || "glass")
          .toLowerCase()
          .trim();
        if (raw.theme.position === "bottom-left") {
          position = "bottom-left";
        }
      }

      const theme = VALID_THEMES.has(rawThemeName)
        ? rawThemeName
        : DEFAULTS.theme;

      const assistantName =
        this.cleanText(raw.assistantName || raw.name, 80) ||
        DEFAULTS.assistantName;
      const businessName =
        this.cleanText(raw.businessName, 80) || DEFAULTS.businessName;

      const defaultWelcome = `Hi! I'm ${assistantName} from ${businessName}. How can I help you today?`;

      return {
        id: String(raw._id || raw.id || this.assistantId),
        assistantName,
        businessName,
        businessDescription: this.cleanText(raw.businessDescription, 500),
        tone: this.cleanText(raw.tone, 40) || DEFAULTS.tone,
        welcomeMessage:
          this.cleanText(raw.welcomeMessage, 500) || defaultWelcome,
        placeholder:
          this.cleanText(raw.placeholder, 100) ||
          (theme === "retro"
            ? "ENTER COMMAND..."
            : `Ask ${assistantName} to perform a task...`),
        statusText:
          this.cleanText(raw.statusText, 40) ||
          (theme === "retro" ? "EXEC_ON" : DEFAULTS.statusText),
        enabled: raw.enabled !== false && raw.geminiStatus !== "inactive",
        enableVoice: raw.enableVoice !== false,
        enableNavigation: raw.enableNavigation !== false,
        voiceLanguage:
          this.cleanText(raw.voiceLanguage, 20) || DEFAULTS.voiceLanguage,
        pages: Array.isArray(raw.pages) ? raw.pages : [],
        theme,
        position,
      };
    }

    cleanText(value, maxLength) {
      if (typeof value !== "string") return "";
      return value.trim().slice(0, maxLength);
    }

    loadStylesheet() {
      const cssUrl =
        this.scriptTag?.getAttribute("data-css-url") ||
        new URL("widget.css", this.scriptTag.src || document.baseURI).href;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssUrl;
      link.crossOrigin = "anonymous";
      this.shadowRoot.appendChild(link);
    }

    renderLoading() {
      this.shadowRoot.innerHTML = `
        <div class="jw-loading" role="status" aria-live="polite">
          Loading assistant…
        </div>
      `;
      this.loadStylesheet();
    }

    renderUnavailable(message) {
      this.shadowRoot.innerHTML = `
        <div class="jw-unavailable" role="status">
          <span>Chat support is temporarily unavailable.</span>
        </div>
      `;
      this.loadStylesheet();
      console.warn("Jarvish AI:", message);
    }

    render() {
      const waveBarsHtml = [1, 2, 3, 4, 5, 4, 3, 2, 1]
        .map(
          (val) =>
            `<div class="jw-wave-bar" data-weight="${val}" style="height: 3px; opacity: 0.25;"></div>`,
        )
        .join("");

      this.shadowRoot.innerHTML = `
        <div class="jw-root">
          <section class="jw-panel" id="jw-panel" aria-label="Chat assistant" aria-hidden="true">
            <div class="jw-overlay" aria-hidden="true"></div>

            <!-- Top Stats Bar (Matches AssistantPreview) -->
            <header class="jw-header">
              <div class="jw-brand">
                <span class="jw-status-dot" aria-hidden="true"></span>
                <div class="jw-heading">
                  <h4 class="jw-title" id="jw-title"></h4>
                  <p class="jw-subtitle" id="jw-subtitle"></p>
                </div>
              </div>

              <div class="jw-header-actions">
                <span class="jw-badge" id="jw-badge">
                  <svg class="jw-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                  </svg>
                  <span id="jw-status-text"></span>
                </span>

                <button class="jw-close" id="jw-close" type="button" aria-label="Close chat">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.3 5.71 17 4.4l-5 5-5-5-1.3 1.31 5 5-5 5L7 17.02l5-5 5 5 1.3-1.31-5-5z"/>
                  </svg>
                </button>
              </div>
            </header>

            <!-- Core Fluid Glowing Orb & Frequency Wavebars -->
            <div class="jw-stage">
              <button
                type="button"
                class="jw-orb-trigger"
                id="jw-orb-trigger"
                aria-label="Tap orb to speak"
                title="Tap to toggle voice"
              >
                <div class="jw-orb-ping" id="jw-orb-ping"></div>
                <div class="jw-orb-pulse" id="jw-orb-pulse"></div>
                <div class="jw-orb-core" id="jw-orb-core"></div>
              </button>

              <div class="jw-wave-container" id="jw-wave-container" aria-hidden="true">
                ${waveBarsHtml}
              </div>

              <div class="jw-caption-box">
                <p class="jw-caption" id="jw-caption" aria-live="polite"></p>
              </div>
            </div>

            <!-- Conversation Log -->
            <div class="jw-messages" id="jw-messages" role="log" aria-live="polite" aria-relevant="additions text">
              <div class="jw-message jw-message--bot" id="jw-welcome"></div>
            </div>

            <div class="jw-error" id="jw-error" role="alert" hidden></div>

            <!-- Action Box Composer -->
            <form class="jw-composer" id="jw-form">
              <label class="jw-sr-only" for="jw-input">Your message</label>
              <div class="jw-input-wrapper">
                <input
                  id="jw-input"
                  class="jw-input"
                  type="text"
                  maxlength="2000"
                  autocomplete="off"
                  placeholder="Ask Jarvish to perform a task..."
                />
                <div class="jw-composer-actions">
                  <button
                    class="jw-mic"
                    id="jw-mic"
                    type="button"
                    aria-label="Speak your message"
                    title="Tap to speak"
                  >
                    <svg class="jw-icon-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  </button>
                  <button id="jw-send" class="jw-send" type="submit" aria-label="Send message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            <div class="jw-footer">Powered by Jarvish AI</div>
          </section>

          <!-- Floating Launcher with Mini Orb Aesthetic -->
          <button
            class="jw-launcher"
            id="jw-launcher"
            type="button"
            aria-label="Open chat"
            aria-expanded="false"
            aria-controls="jw-panel"
          >
            <span class="jw-launcher-orb" aria-hidden="true"></span>
            <svg class="jw-launcher-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            <svg class="jw-launcher-close" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m18.3 5.7-1.4-1.4-4.9 5-4.9-5-1.4 1.4 5 5-5 5 1.4 1.4 4.9-5 4.9 5 1.4-1.4-5-5z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      `;

      this.loadStylesheet();
    }

    applyConfig() {
      const config = this.config;
      const isRetro = config.theme === "retro";
      const hostStyle = this.container.style;

      // Apply theme class (`jw-theme-light`, `jw-theme-glass`, `jw-theme-dark`, `jw-theme-neon`, `jw-theme-retro`)
      VALID_THEMES.forEach((t) =>
        this.container.classList.remove(`jw-theme-${t}`),
      );
      this.container.classList.add(`jw-theme-${config.theme}`);
      this.container.setAttribute("data-position", config.position);

      hostStyle.setProperty(
        "--jw-position-left",
        config.position === "bottom-left" ? "24px" : "auto",
      );
      hostStyle.setProperty(
        "--jw-position-right",
        config.position === "bottom-right" ? "24px" : "auto",
      );

      const title = this.shadowRoot.getElementById("jw-title");
      const subtitle = this.shadowRoot.getElementById("jw-subtitle");
      const status = this.shadowRoot.getElementById("jw-status-text");
      const welcome = this.shadowRoot.getElementById("jw-welcome");
      const input = this.shadowRoot.getElementById("jw-input");

      if (title) {
        title.textContent = isRetro
          ? `${config.assistantName.toUpperCase().slice(0, 8)}_SYS`
          : config.assistantName;
      }
      if (subtitle) {
        subtitle.textContent = isRetro ? "V_4.12" : config.businessName;
      }
      if (status) {
        status.textContent = isRetro ? "EXEC_ON" : config.statusText;
      }
      if (welcome) {
        welcome.textContent = config.welcomeMessage;
        this.addSpeakButton(welcome, config.welcomeMessage);
      }
      if (input) {
        input.placeholder = config.placeholder;
      }

      const micButton = this.shadowRoot.getElementById("jw-mic");
      if (micButton) {
        micButton.hidden = !config.enableVoice;
      }

      this.updateCaptionState();
    }

    formatCaption(text, isSystemInput = false) {
      if (this.config?.theme === "retro") {
        return isSystemInput
          ? `SYS_IN: ${text.toUpperCase()}`
          : text.toUpperCase();
      }
      return isSystemInput ? `"${text}"` : text;
    }

    updateCaptionState(customText = "") {
      const caption = this.shadowRoot.getElementById("jw-caption");
      const panel = this.shadowRoot.getElementById("jw-panel");
      if (!caption) return;

      const isActive = this.isListening || this.isSpeaking;
      panel?.classList.toggle("jw-voice-active", isActive);

      if (customText) {
        caption.textContent = customText;
        return;
      }

      if (this.isListening) {
        caption.textContent = this.formatCaption(
          `${this.config.assistantName} is listening...`,
          false,
        );
      } else if (this.isSpeaking) {
        caption.textContent = this.formatCaption(
          `${this.config.assistantName} is speaking...`,
          false,
        );
      } else {
        caption.textContent =
          this.config.theme === "retro"
            ? "READY FOR COMMAND..."
            : "Tap orb or mic to speak, or type below...";
      }

      this.syncWaveAnimation();
    }

    syncWaveAnimation() {
      const bars = this.shadowRoot.querySelectorAll(".jw-wave-bar");
      if (!bars.length) return;

      const active = this.isListening || this.isSpeaking;

      if (active && !this.waveInterval) {
        this.waveInterval = setInterval(() => {
          bars.forEach((bar) => {
            const weight = Number(bar.getAttribute("data-weight")) || 1;
            const height = Math.max(
              8,
              Math.round(weight * (Math.random() * 5.5)),
            );
            bar.style.height = `${height}px`;
            bar.style.opacity = "1";
          });
        }, 160);
      } else if (!active) {
        if (this.waveInterval) {
          clearInterval(this.waveInterval);
          this.waveInterval = null;
        }
        bars.forEach((bar) => {
          bar.style.height = "3px";
          bar.style.opacity = "0.22";
        });
      }
    }

    bindEvents() {
      const launcher = this.shadowRoot.getElementById("jw-launcher");
      const close = this.shadowRoot.getElementById("jw-close");
      const form = this.shadowRoot.getElementById("jw-form");
      const input = this.shadowRoot.getElementById("jw-input");
      const orbTrigger = this.shadowRoot.getElementById("jw-orb-trigger");

      launcher?.addEventListener("click", () => this.toggleOpen());
      close?.addEventListener("click", () => this.setOpen(false));
      form?.addEventListener("submit", (event) => {
        event.preventDefault();
        this.sendMessage();
      });

      // Clicking the central glowing orb toggles voice mode (or stops current speech)
      orbTrigger?.addEventListener("click", () => {
        if (!this.config?.enableVoice) {
          input?.focus();
          return;
        }
        if (this.isSpeaking) {
          this.stopSpeaking();
        }
        this.toggleListening();
      });

      this.shadowRoot.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && this.isOpen) this.setOpen(false);
      });

      input?.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && event.shiftKey) event.preventDefault();
      });

      this.setupVoice();
    }

    toggleOpen() {
      this.setOpen(!this.isOpen);
    }

    setOpen(open) {
      this.isOpen = open;
      const panel = this.shadowRoot.getElementById("jw-panel");
      const launcher = this.shadowRoot.getElementById("jw-launcher");
      if (!panel || !launcher) return;

      panel.classList.toggle("jw-panel--open", open);
      panel.setAttribute("aria-hidden", String(!open));
      launcher.setAttribute("aria-expanded", String(open));
      launcher.setAttribute("aria-label", open ? "Close chat" : "Open chat");
      this.container.classList.toggle("jw-is-open", open);

      if (open) {
        this.shadowRoot.getElementById("jw-input")?.focus();
        // Automatically speak welcome message on first open without human intervention
        if (!this.hasGreeted && this.config?.enableVoice) {
          this.hasGreeted = true;
          this.speakText(this.config.welcomeMessage);
        }
      } else {
        this.stopListening();
        this.stopSpeaking();
      }
    }

    setError(message) {
      const error = this.shadowRoot.getElementById("jw-error");
      if (!error) return;
      error.textContent = message || "";
      error.hidden = !message;
    }

    appendMessage(text, role) {
      const container = this.shadowRoot.getElementById("jw-messages");
      if (!container) return null;

      const element = document.createElement("div");
      element.className = `jw-message ${
        role === "user" ? "jw-message--user" : "jw-message--bot"
      }`;

      const textSpan = document.createElement("span");
      textSpan.className = "jw-message-text";
      textSpan.textContent = text;
      element.appendChild(textSpan);

      container.appendChild(element);
      container.scrollTop = container.scrollHeight;
      return element;
    }

    setupVoice() {
      this.speechRecognition = null;
      this.micButton = this.shadowRoot.getElementById("jw-mic");
      this.input = this.shadowRoot.getElementById("jw-input");

      if (!this.micButton || !this.input || !this.config?.enableVoice) return;

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        this.micButton.disabled = true;
        this.micButton.title =
          "Speech recognition is not supported in this browser. Try Chrome or Edge.";
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = this.config.voiceLanguage || "en-IN";
      recognition.continuous = false;
      recognition.interimResults = true;
      this.speechRecognition = recognition;

      recognition.onstart = () => {
        this.isListening = true;
        this.finalTranscript = "";
        this.stopSpeaking();
        this.micButton?.classList.add("jw-mic--listening");
        this.micButton?.setAttribute("aria-label", "Stop listening");
        this.micButton.title = "Stop listening";
        this.setError("");
        this.updateCaptionState();
      };

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        const cleaned = transcript.trim();
        this.finalTranscript = cleaned;
        this.input.value = cleaned;
        if (cleaned) {
          this.updateCaptionState(this.formatCaption(cleaned, true));
        }
      };

      recognition.onerror = (event) => {
        const messages = {
          "not-allowed":
            "Microphone access was blocked. Allow microphone access in browser settings.",
          "service-not-allowed":
            "Speech recognition is blocked by this browser or device.",
          "no-speech":
            "No speech was detected. Tap the orb or mic to try again.",
          network: "Speech recognition requires a working network connection.",
          "audio-capture": "No working microphone was found.",
        };
        if (event.error !== "aborted") {
          this.setError(
            messages[event.error] ||
              "Voice input could not start. Please type your message instead.",
          );
        }
      };

      recognition.onend = () => {
        const capturedText = this.finalTranscript.trim();
        this.isListening = false;
        this.micButton?.classList.remove("jw-mic--listening");
        this.micButton?.setAttribute("aria-label", "Speak your message");
        if (this.micButton) this.micButton.title = "Tap to speak";
        this.updateCaptionState();

        // Automatically send the voice command once the user finishes speaking
        if (capturedText && !this.isSending) {
          this.finalTranscript = "";
          this.sendMessage();
        }
      };

      this.micButton.addEventListener("click", () => this.toggleListening());
    }

    toggleListening() {
      if (!this.speechRecognition) return;
      if (this.isListening) {
        this.stopListening();
        return;
      }
      try {
        this.setError("");
        this.speechRecognition.start();
      } catch (error) {
        console.warn("Jarvish AI: could not start speech recognition.", error);
      }
    }

    stopListening() {
      if (this.speechRecognition && this.isListening) {
        try {
          this.speechRecognition.stop();
        } catch (_) {}
      }
    }

    speakText(text) {
      if (!this.config?.enableVoice || !("speechSynthesis" in window)) return;
      const clean = String(text || "").trim();
      if (!clean) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = this.config.voiceLanguage || "en-IN";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        this.isSpeaking = true;
        const previewSnippet =
          clean.length > 75 ? `${clean.slice(0, 75)}…` : clean;
        this.updateCaptionState(this.formatCaption(previewSnippet, false));
        this.syncWaveAnimation();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.updateCaptionState();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.updateCaptionState();
      };

      window.speechSynthesis.speak(utterance);
    }

    stopSpeaking() {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      this.isSpeaking = false;
      this.updateCaptionState();
    }

    addSpeakButton(messageElement, messageText) {
      if (
        !messageElement ||
        !this.config?.enableVoice ||
        !("speechSynthesis" in window)
      )
        return;

      const existing = messageElement.querySelector(".jw-speak");
      if (existing) existing.remove();

      const button = document.createElement("button");
      button.type = "button";
      button.className = "jw-speak";
      button.setAttribute("aria-label", "Replay voice response");
      button.title = "Replay voice";
      button.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9v6h4l5 4V5L7 9H3Z" fill="currentColor"/>
          <path d="M16 9a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
      button.addEventListener("click", () => this.speakText(messageText));
      messageElement.appendChild(button);
    }

    checkClientNavigation(messageText, apiPayload) {
      if (!this.config?.enableNavigation) return;

      // 1. Check if backend explicitly returned a redirect/navigation URL
      const targetUrl =
        apiPayload?.navigateTo || apiPayload?.redirectUrl || apiPayload?.url;
      if (typeof targetUrl === "string" && targetUrl.trim()) {
        setTimeout(() => {
          window.location.href = targetUrl.trim();
        }, 1200);
        return;
      }

      // 2. Match against configured pages keywords if provided
      if (!Array.isArray(this.config.pages) || !this.config.pages.length)
        return;
      const lowerMsg = messageText.toLowerCase();

      for (const page of this.config.pages) {
        const keywords = Array.isArray(page.keywords) ? page.keywords : [];
        const matched = keywords.some((kw) =>
          lowerMsg.includes(String(kw).toLowerCase().trim()),
        );
        if (matched && page.path) {
          setTimeout(() => {
            window.location.href = page.path;
          }, 1200);
          break;
        }
      }
    }

    setSending(sending) {
      this.isSending = sending;
      const button = this.shadowRoot.getElementById("jw-send");
      const input = this.shadowRoot.getElementById("jw-input");
      if (button) button.disabled = sending;
      if (input) input.disabled = sending;
      if (button) button.setAttribute("aria-busy", String(sending));
    }

    async sendMessage() {
      if (this.isSending) return;

      const input = this.shadowRoot.getElementById("jw-input");
      const message = input?.value.trim();
      if (!message) return;

      this.stopSpeaking();
      this.setError("");
      this.appendMessage(message, "user");
      input.value = "";
      this.setSending(true);
      this.updateCaptionState(
        this.config.theme === "retro"
          ? "PROCESSING_QUERY..."
          : `${this.config.assistantName} is thinking...`,
      );

      const typing = this.appendMessage("Thinking…", "bot");
      typing?.classList.add("jw-message--typing");

      try {
        this.abortController = new AbortController();
        const response = await fetch(`${this.apiBaseUrl}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "omit",
          signal: this.abortController.signal,
          body: JSON.stringify({
            assistantId: this.assistantId,
            message,
          }),
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.message || "Unable to send your message.");
        }

        const answer =
          typeof payload.reply === "string"
            ? payload.reply
            : typeof payload.response === "string"
              ? payload.response
              : typeof payload.message === "string"
                ? payload.message
                : "";

        if (!answer) {
          throw new Error("The assistant returned an empty response.");
        }

        if (typing) {
          const textNode = typing.querySelector(".jw-message-text");
          if (textNode) textNode.textContent = answer;
          else typing.textContent = answer;
        }
        typing?.classList.remove("jw-message--typing");
        this.addSpeakButton(typing, answer);

        // Automatically speak the response aloud without human intervention
        this.speakText(answer);

        // Trigger navigation if applicable
        this.checkClientNavigation(message, payload);
      } catch (error) {
        typing?.remove();
        this.updateCaptionState();
        if (error?.name !== "AbortError") {
          this.setError(
            "Sorry, we couldn't send that message. Please try again.",
          );
          console.error("Jarvish AI chat error:", error);
        }
      } finally {
        this.abortController = null;
        this.setSending(false);
        const container = this.shadowRoot.getElementById("jw-messages");
        if (container) container.scrollTop = container.scrollHeight;
        input?.focus();
      }
    }
  }

  // Attempt automatic script tag discovery or fallback to querySelector
  const scriptTag =
    document.currentScript ||
    document.querySelector("script[data-assistant-id]");

  if (!scriptTag) {
    console.error("Jarvish AI: unable to identify the embed script.");
    return;
  }

  if (scriptTag.dataset.jarvishInitialized === "true") return;
  scriptTag.dataset.jarvishInitialized = "true";
  new JarvishWidget(scriptTag);
})();
