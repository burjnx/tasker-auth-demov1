import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { fieldClass, labelClass, primaryBtn, secondaryBtn } from "../../components/Modal";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import validateEmail from "../../utils/helper";

function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const { reset } = useData();
  const showToast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});
  const [confirmReset, setConfirmReset] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name";
    if (!validateEmail(form.email)) next.email = "Please enter a valid email address";
    setErrors(next);
    if (Object.keys(next).length) return;
    updateProfile({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim() });
    showToast("Profile saved");
  };

  return (
    <div>
      <Header />
      <div className="mt-6 max-w-2xl space-y-8">
        <h2 className="text-xl font-medium">Settings</h2>

        <section className="rounded-xl border border-[#E6E6E6] p-5 sm:p-6">
          <h3 className="mb-1 text-lg font-semibold text-black">Profile</h3>
          <p className="mb-5 text-sm text-[#808080]">This name is used in your greeting and on projects you create.</p>
          <form onSubmit={save} noValidate className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="s-first">First name</label>
                <input id="s-first" className={fieldClass} value={form.firstName} onChange={set("firstName")} autoComplete="given-name" />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="s-last">Last name</label>
                <input id="s-last" className={fieldClass} value={form.lastName} onChange={set("lastName")} autoComplete="family-name" />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="s-email">Email</label>
              <input id="s-email" type="email" className={fieldClass} value={form.email} onChange={set("email")} autoComplete="email" />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <button type="submit" className={primaryBtn}>Save changes</button>
          </form>
        </section>

        <section className="rounded-xl border border-[#E6E6E6] p-5 sm:p-6">
          <h3 className="mb-1 text-lg font-semibold text-black">Demo data</h3>
          <p className="mb-5 text-sm text-[#808080]">
            Tasks, projects and favourites you change are saved in this browser. Reset to start again with the sample data.
          </p>
          {confirmReset ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-black">Reset all demo data?</span>
              <button
                className="rounded-[10px] bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                  showToast("Demo data reset");
                }}
              >
                Yes, reset
              </button>
              <button className={secondaryBtn} onClick={() => setConfirmReset(false)}>Cancel</button>
            </div>
          ) : (
            <button className={secondaryBtn} onClick={() => setConfirmReset(true)}>Reset demo data</button>
          )}
        </section>

        <section className="rounded-xl border border-[#E6E6E6] p-5 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-black">Account</h3>
          <button
            className={secondaryBtn}
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            Log out
          </button>
        </section>
      </div>
    </div>
  );
}

export default Settings;
