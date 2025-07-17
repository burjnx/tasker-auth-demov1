import React, { useRef, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'


const OTPVerification = () => {



    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        const val = value.trim();
        if (!/^\d?$/.test(val)) return; // Only allow single digit or empty

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        if (val && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "") {
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                    setOtp((prev) => {
                        const updated = [...prev];
                        updated[index - 1] = "";
                        return updated;
                    });
                }
            } else {
                setOtp((prev) => {
                    const updated = [...prev];
                    updated[index] = "";
                    return updated;
                });
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text");
        if (/^\d{4}$/.test(paste)) {
            const digits = paste.split("");
            setOtp(digits);
            digits.forEach((digit, i) => {
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = digit;
                }
            });
            inputRefs.current[3]?.focus();
        }
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length === 4) {
            console.log("Submitted OTP:", code);
            // Continue logic here
        } else {
            alert("Enter all 4 digits.");
        }
    };


    return (
        <div className=''>
            <AuthLayout>
                <div className="pb-12 w-[90%] md:w-[500px] flex flex-col items-center border rounded-[20px] border-[#E0E0E0] mt-[60px]">
                    <h2 className="text-[21px] font-bold text-black mt-[60px]">
                        OTP VERIFICATION
                    </h2>
                    <p className="text-base text-slate-400 mt-[5px] mb-6 text-center">
                        Enter the 4-digit OTP sent to your email
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
                        {/* OTP Boxes */}
                        <div className="flex space-x-4" onPaste={handlePaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className="w-12 h-12 border border-[#D7D7D7] rounded-md text-center text-xl font-semibold focus:outline-[#903DE2]"
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                />
                            ))}
                        </div>

                        {/* Proceed Button */}
                        <button type="submit" className="btn-login">
                            Proceed
                        </button>

                        {/* Resend */}
                        <p className="text-sm text-[#222222]">
                            Didn’t receive OTP?{" "}
                            <button type="button" className="text-[#903DE2A1] underline ml-1">
                                Resend
                            </button>
                        </p>
                    </form>
                </div>

            </AuthLayout>
        </div>
    )
}

export default OTPVerification
