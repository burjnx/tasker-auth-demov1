import React from 'react'
import { BiCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import ThankYouImage from "../../assets/images/thanks-amico.png"

const Thanks = () => {
    const navigate = useNavigate();

    const handleDone = () => {
        navigate("/dashboard");
    };
    return (
        <div>
            <AuthLayout image={ThankYouImage}
                title="You're Verified!"
                description="You’re all set and ready to go">
                <div className="w-[90%] md:w-[500px] flex flex-col items-center border rounded-[20px] border-[#E0E0E0] py-12 mt-[60px]">
                    {/* Circle with check */}
                    <div className="w-28 h-28 rounded-full bg-[#903DE2] flex items-center justify-center mb-6">
                        <BiCheck size={50} color="white" strokeWidth={2.5} />
                    </div>

                    {/* Text */}
                    <h2 className="text-[24px] font-bold text-black mb-2">Thank You!</h2>
                    <p className="text-base text-slate-500 mb-6 text-center">
                        Your verification is complete.
                    </p>

                    {/* Done Button */}
                    <button onClick={handleDone} className="btn-login w-40">
                        Done
                    </button>
                </div>
            </AuthLayout>
        </div>
    )
}

export default Thanks
