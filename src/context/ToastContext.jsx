/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(() => {});

// Short message at the bottom of the screen, e.g. "Task added".
export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const timer = useRef(null);

  const showToast = useCallback((text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2800);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 bottom-6 z-[80] -translate-x-1/2 max-w-[90vw] rounded-xl bg-[#1f1f2e] px-5 py-3 text-sm text-white shadow-lg transition-all duration-200 ${
          message ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
        }`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

// For buttons that are part of the design but not built in this demo
export const useComingSoon = () => {
  const showToast = useToast();
  return (feature) => showToast(`${feature} isn't available in this demo yet`);
};
