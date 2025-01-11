"use client"

import React, { useState } from 'react';

import Link from 'next/link';
import { FaShareSquare } from 'react-icons/fa';
import {
  FaDownload,
  FaXmark,
} from 'react-icons/fa6';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

interface Props {
  onClose: () => void;
}

const UserModal = ({ onClose }: Props) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleModalSwitch = (modalType: "signup" | "login") => {
    if (modalType === "login") {
      setShowSignUpModal(false);
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
      setShowSignUpModal(true);
    }
  };


  return (
    <div className="fixed inset-0 z-50 font-sans bg-black bg-opacity-90 flex justify-center items-center overflow-hidden">
      <div className="scrollable-hidden w-[550px] h-[577px] rounded-lg">
        <div className="bg-white w-full relative p-12 rounded-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#bfbfbf] flex items-center justify-center border-none outline-none"
          >
            <FaXmark className="text-xl" />
          </button>
          <div className="flex flex-col w-full">
            <h3 className=" font-medium leading-[41.6px] tracking-[-1.3px] text-[32px] text-[#191919]">
              What are you mainly using Monochrome for?
            </h3>
            <p className="text-[17px] mt-2 text-[#7f7f7f]  leading-[27.2px] tracking-[-0.5px]">
              You&apos;ll always be able to do both things. This simply helps us
              create a better experience for you.
            </p>
            <button
              type="button"
              onClick={() => setShowSignUpModal(true)}
              className="flex text-center items-center place-content-center place-items-center gap-2 w-full py-[13px] 2xl:text-[17px] font-medium 2xl:leading-[20.8px] lg:text-[15px] lg:leading-[19.5px] -tracking-[0.2px] text-[#000000] border-[1px] hover:border-gray-500  mt-6 rounded-xl"
            >
              <FaDownload />
              Download content
            </button>
            <Link href="/auth/signup">
              <button className="flex text-center items-center place-content-center place-items-center gap-2 w-full py-[13px] 2xl:text-[17px] font-medium 2xl:leading-[20.8px] lg:text-[15px] lg:leading-[19.5px] -tracking-[0.2px] text-[#000000] border-[1px] hover:border-gray-500 mt-2 rounded-xl">
                <FaShareSquare />
                Share photos and videos
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showSignUpModal && (
        <SignUpModal
          onClose={() => setShowSignUpModal(false)}
          onSwitchToLogin={() => handleModalSwitch("login")}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignUp={() => handleModalSwitch("signup")}
        />
      )}
    </div>
  );
}

export default UserModal