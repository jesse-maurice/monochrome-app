"use client"

import React, {
  useEffect,
  useState,
} from 'react';

import {
  signIn,
  useSession,
} from 'next-auth/react';
import router from 'next/router';
import {
  FaApple,
  FaFacebook,
} from 'react-icons/fa';
import {
  FaGoogle,
  FaXmark,
} from 'react-icons/fa6';

import LoadingSpinner from './LoadingSpinner';
import LoginModal from './LoginModal';

interface Props {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpModal = ({ onClose, onSwitchToLogin }: Props) => {
  // const router = useRouter();
  const { data: session, status } = useSession();
  const [, setUser] = useState<{
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with CSS transition duration
  };

  // const handleLoginClick = () => {
  //   setIsLeaving(true);
  //   setTimeout(() => {
  //     onClose();
  //     setShowLoginModal(true);
  //   }, 300);
  // };


  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        firstName,
        lastName,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect on success
        router.push("/");
      }
    } catch (error: Error | unknown) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  // const handleLogout = async () => {
  //   await signOut({ redirect: true, callbackUrl: "/SignUp" });
  // };
  


  return (
    <div className="fixed inset-0 z-50 font-jakarta bg-black bg-opacity-5 flex justify-center items-center overflow-hidden">
      <div
        className={`scrollable-hidden w-auto h-auto rounded-lg transform transition-transform duration-300 ease-in-out
          ${
            isLeaving
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
      >
        <div className="bg-white w-full relative p-14 rounded-2xl">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-[#bfbfbf] flex items-center justify-center border-none outline-none"
          >
            <FaXmark className="text-xl" />
          </button>
          <div className="flex flex-col w-full">
            <h3 className="text-2xl font-medium leading-[31.2px] tracking-[-1px] text-[#191919] text-center">
              Sign Up to Monochrome
            </h3>
            <p className="text-base mt-2 mb-3 leading-[25.6px] tracking-[-0.5px] text-[#7f7f7f] text-center">
              More than 3 million free photos and videos to bring your ideas to
              life.
            </p>
            <div className="flex items-center justify-center w-full gap-3 mt-5">
              <button
                type="button"
                className="flex w-full items-center justify-center google text-[17px] leading-[27.2px] -tracking-[0.5px] gap-2 font-medium text-[#2c343e] border-[1px] border-gray-300 hover:border-gray-400 rounded-xl py-2 hover:bg-gray-100"
              >
                {/* <Image 
                width={36} 
                height={36} 
                src={googleIcon} 
                alt="google icon"
                className="w-9 h-9"
              /> */}
                <FaGoogle className=" text-sm" />
                Join with Google
              </button>
              <button
                className="apple p-[12px] border-[1px] border-gray-300 rounded-xl hover:bg-[#000000]"
                type="button"
              >
                <FaApple className="text-[#4a4a4a] text-xl hover:text-[#ffffff]" />
              </button>
              <button
                className="apple p-[12px] border-[1px] border-gray-300 rounded-xl hover:bg-[#000000]"
                type="button"
              >
                <FaFacebook className="text-[#4a4a4a] text-xl hover:text-[#ffffff]" />
              </button>
            </div>
            <div className="flex items-center justify-center w-full lg:my-4 2xl:my-7">
              <hr className="w-full border-gray-100 "></hr>
              <p className="w-full 2xl:text-[15px] lg:text-[14px] text-center font-medium leading-[26px] text-[#7f7f7f]">
                Or, sign up with email
              </p>
              <hr className="w-full border-gray-100"></hr>
            </div>
            <div className="w-full">
              {/* Error Message */}
              {error && <p className="text-center text-red-500">{error}</p>}
              <form onSubmit={handleSignUp} noValidate>
                <div className="grid w-full grid-cols-2 gap-2 ">
                  <div className="">
                    <input
                      className="relative w-full rounded-md pl-5 py-3 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
                      type="text"
                      name="firstName"
                      autoComplete="off"
                      value={firstName}
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                  </div>
                  <div className="">
                    <input
                      className="relative w-full rounded-md pl-5 py-3 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
                      type="text"
                      name="lastName"
                      autoComplete="off"
                      value={lastName}
                      placeholder="Last name"
                      onChange={(e) => setLastName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="my-3 ">
                  <input
                    className="relative w-full rounded-md pl-5 py-3 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
                    type=""
                    name=""
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <input
                    className="relative w-full rounded-md pl-5 py-3 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    pattern=".{7,}"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <button
                  className="w-full py-[14px] 2xl:text-[17px] font-medium 2xl:leading-[20.8px] lg:text-[15px] lg:leading-[22.1px] -tracking-[0.5px] hover:bg-white hover:text-[#000000] hover:border-[1px] hover:border-gray-500 mt-8 bg-black rounded-xl text-[#ffffff]"
                  type="button"
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>
          <p className="text-center text-[14px] mt-4 mb-5 leading-[22px] font-medium text-[#7f7f7f] ">
            By joining, you agree to our{" "}
            <span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-[#7f7f7f]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-[#7f7f7f]">
              Privacy Policy
            </span>
          </p>
          <p className="text-center font-medium text-[#4a4a4a]">
            Already have an account?
            <span
              onClick={onSwitchToLogin}
              className="underline decoration-dotted cursor-pointer decoration-[#7f7f7f] decoration-2 underline-offset-4 ml-2"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onSwitchToSignUp={function (): void {
          throw new Error("Function not implemented.");
        } } />
      )}
    </div>
  );
}

export default SignUpModal