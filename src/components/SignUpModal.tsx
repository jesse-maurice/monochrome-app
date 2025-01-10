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
  FaGoogle,
  FaXmark,
} from 'react-icons/fa6';

import LoadingSpinner from './LoadingSpinner';

interface Props {
  onClose: () => void;
}

const SignUpModal = ({ onClose }: Props) => {
  // const router = useRouter();
  const { data: session, status } = useSession();
  const [, setUser] = useState<{
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");


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
    <div className="fixed inset-0 z-50 font-sans bg-black bg-opacity-90 flex justify-center items-center overflow-hidden">
      <div className="scrollable-hidden w-auto h-auto rounded-lg">
        <div className="bg-white w-full relative p-12 rounded-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#bfbfbf] flex items-center justify-center border-none outline-none"
          >
            <FaXmark className="text-xl" />
          </button>
          <div className="flex flex-col w-full">
            <h3 className=" text-center">Sign Up to Monochrome</h3>
            <p className="text-center">
              More than 3 million free photos and videos to bring your ideas to
              life.
            </p>
            <div className="flex items-center justify-center w-full gap-4 mt-5">
              <button
                type="button"
                className="flex w-full items-center justify-center google text-base leading-[28px] -tracking-[0.2px] gap-2 font-semibold text-[#2c343e] border-[1px] border-gray-300 hover:border-gray-400 rounded-md py-1 hover:bg-gray-100"
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
                className="apple px-3 py-[10px] border-[1px] border-gray-300 rounded-md hover:bg-[#000000]"
                type="button"
              >
                <FaApple className="text-[#4a4a4a] hover:text-[#ffffff] "></FaApple>
              </button>
            </div>
            <div className="flex items-center justify-center w-full lg:my-4 2xl:my-7">
              <hr className="w-full border-gray-100 "></hr>
              <p className="w-full 2xl:text-[16px] lg:text-[14px] text-center font-semibold leading-[26px] text-[#7f7f7f]">
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
                  className="w-full py-[13px] 2xl:text-[16px] font-medium 2xl:leading-[20.8px] lg:text-[15px] lg:leading-[19.5px] -tracking-[0.2px] hover:bg-white hover:text-[#000000] hover:border-[1px] hover:border-gray-500 mt-8 bg-black rounded-xl text-[#ffffff]"
                  type="button"
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>
          <p className="text-center text-[14px] leading-[22px] font-medium text-[#7f7f7f] ">
            By joining, you agree to our{" "}
            <span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-[#7f7f7f]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-[#7f7f7f]">
              Privacy Policy
            </span>
          </p>
          <p  className="text-center">Already have an account? Log in</p>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal