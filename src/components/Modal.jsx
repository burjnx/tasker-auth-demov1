import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Accessible pop-up: closes with Esc, the X button or a click on the backdrop.
function Modal({ title, onClose, children, width = "max-w-lg" }) {
  const panel = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Runs once when the pop-up opens (not on every re-render)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    const first =
      panel.current?.querySelector("input:not([type=radio]), select, textarea") ||
      panel.current?.querySelector("button");
    first?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full ${width} max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white p-6 shadow-xl`}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-black"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;

// Shared form field styles
export const fieldClass =
  "w-full rounded-[10px] border border-slate-200 px-4 py-2.5 text-black outline-none focus:border-[#903DE2] focus:ring-2 focus:ring-[#903DE2]/20";
export const labelClass = "mb-1.5 block text-sm font-semibold text-black";
export const primaryBtn =
  "rounded-[10px] bg-[#903DE2] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7c2bd9] disabled:opacity-50";
export const secondaryBtn =
  "rounded-[10px] border border-slate-200 px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-50";
