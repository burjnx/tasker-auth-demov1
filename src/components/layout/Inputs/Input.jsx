import React, { useId, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, onChange, label, placeholder, type = "text", error, autoComplete }) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  const isPassword = type === "password";

  return (
    <div className="mt-4 w-full md:w-auto">
      <label htmlFor={id} className="text-[16px] text-black font-semibold">
        {label}
      </label>

      <div className={`input-box ${error ? "border-red-400" : ""}`}>
        <input
          id={id}
          type={isPassword && !showPassword ? "password" : isPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          className="w-full bg-transparent outline-none text-black"
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaRegEye size={22} className="text-[#903DE2]" />
            ) : (
              <FaRegEyeSlash size={22} className="text-slate-400" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}

export default Input;
