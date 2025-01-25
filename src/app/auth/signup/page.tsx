'use client'

import React, {
  useEffect,
  useState,
} from 'react';

import {
  signIn,
  useSession,
} from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaApple,
  FaCheck,
} from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa6';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import LoadingSpinner from '../../../components/LoadingSpinner';
import images from '../../../data/images.json';

// interface Props {}

// const googleIcon = '/public/assets/icons/Google_Icons-09-512.webp';

const SignUp = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // const [user] = useState<{
  //   id?: string | null;
  //   name?: string | null;
  //   email?: string | null;
  //   image?: string | null;
  // } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const imageList = images;
  

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    // Function to switch to the next image index
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval
  }, [imageList.length]);

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/signin');
  //   }
  // }, [status, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation remains the same
    if (!email || !password || !firstName || !lastName) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Register the user - Note the full URL path
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: `${firstName} ${lastName}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // If registration successful, sign in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/"); // Redirect to homepage after successful signup
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  // const handleLogout = async () => {
  //   await signOut({ redirect: true, callbackUrl: '/auth/signup' });
  // };

  return (
    <div className="flex flex-col w-full h-full font-jakarta">
      <header className="z-10 flex flex-row bg-white items-center sticky top-0 border-b-[1px] border-b-gray-100 content-center justify-between w-full pt-1 pb-2 border-box px-44 max-sm:px-4 md:px-10 lg:px-10 xl:px-10 2xl:px-20">
        <Link href="/">
          <h1 className="font-high text-[50px] max-sm:text-[40px] text-[#000000]">
            m
          </h1>
        </Link>
        <Link href="/signin">
          <button className="bg-[#ef5350] flex items-center justify-center text-white px-[16px] font-jakarta font-semibold outline-none border-none max-sm:py-[7px] max-sm:px-[20px] max-sm:text-base md:text-[15px] leading-[19.5px] -tracking-[0.2px] transition ease-in delay-150 hover:translate-y-1 hover:scale-40 hover:bg-[#ef5350] duration-300 py-[10px] rounded-lg">
            Login
          </button>
        </Link>
      </header>
      <main className="grid w-full grid-cols-2 gap-10 mt-8 lg:mt-12 px-44 max-sm:px-4 md:px-10 lg:px-10 xl:px-10 2xl:px-20 mx-auto">
        <div className=" main-description">
          <h1 className=" font-medium text-[#2c343e] lg:text-[27px] 2xl:text-[30px] leading-[40px] lg:-tracking-[0.5px] 2xl:-tracking-[0.7px]">
            Afrocentric stock imagery to fuel your business initiatives and
            ignite artistic innovation.
          </h1>
          <p className=" 2xl:text-[20px] mt-3 mb-4 text-[#2c343e] font-medium 2xl:leading-[36px] 2xl:-tracking-[0.3px] lg:text-[17px] lg:leading-[30px] lg:-tracking-[0.4px]">
            Upload your photos and videos to one of the internet&apos;s most
            expansive repositories of visual content, free of charge.
          </p>
          <ul className=" 2xl:text-[18px] font-semibold 2xl:leading-[28px] lg:text-[15px] lg:leading-[26px] text-[#7f7f7f]">
            <li className="flex items-center gap-2">
              <FaCheck className="text-base" style={{ color: "#ef5350" }} />
              <p>
                <span>Reach a global audience of more than</span>
                <span className="text-[#4a4a4a] font-bold"> 30 million</span>
              </p>
            </li>
            <li className="flex items-center gap-2 my-1">
              <FaCheck className="text-base" style={{ color: "#ef5350" }} />
              <p>
                <span className=" text-[#4a4a4a] font-bold">
                  Help creative people all over the world
                </span>
                <span> bring their ideas to life</span>
              </p>
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-base" style={{ color: "#ef5350" }} />
              <p>
                <span>Join more than 320K</span>
                <span className=" text-[#4a4a4a] font-bold">
                  {" "}
                  incredibly talented photographers
                </span>
              </p>
            </li>
          </ul>

          <div className="flex items-center justify-center w-full gap-2 mt-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center google text-base leading-[28px] -tracking-[0.2px] gap-2 font-semibold text-[#2c343e] border-[1px] border-gray-300 hover:border-gray-400 rounded-lg py-2 hover:bg-gray-100"
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
              className="apple px-3 py-[12.5px] border-[1px] border-gray-300 rounded-lg hover:bg-[#000000]"
              type="button"
            >
              <FaApple className="text-[#4a4a4a] text-xl hover:text-[#ffffff] "></FaApple>
            </button>
          </div>
          <div className="flex items-center justify-center w-full lg:my-4 2xl:my-7">
            <hr className="w-full border-gray-100"></hr>
            <p className="w-full 2xl:text-[16px] lg:text-[14px] text-center font-semibold leading-[26px] text-[#7f7f7f]">
              Or, sign up with email
            </p>
            <hr className="w-full border-gray-100"></hr>
          </div>
          <div className="w-full">
            {error && (
              <p className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-lg">
                {error}
              </p>
            )}
            {/* {error && <p className="text-center text-red-500">{error}</p>} */}
            <form onSubmit={handleSignUp} noValidate>
              <div className="grid w-full grid-cols-2 gap-2 ">
                <div className="">
                  <input
                    className="relative w-full rounded-lg pl-5 py-2 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
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
                    className="relative w-full rounded-lg pl-5 py-2 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
                    type="text"
                    name="lastName"
                    autoComplete="off"
                    value={lastName}
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="my-5 ">
                <input
                  className="relative w-full rounded-lg pl-5 py-2 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
                  type=""
                  name=""
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <input
                  className="relative w-full rounded-lg pl-5 py-2 text-[18px] leading-[28px] border-[1px] font-normal text-[#7f7f7f] border-gray-300 outline-none"
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
                className="w-full py-[13px] 2xl:text-[16px] font-semibold 2xl:leading-[20.8px] lg:text-[15px] lg:leading-[19.5px] -tracking-[0.2px] hover:bg-opacity-70 mt-8 bg-black rounded-xl text-[#ffffff]"
                type="submit"
                disabled={isLoading}
              >
                {isLoading
                  ? "Creating account..."
                  : "Start sharing your content on Monochrome"}
              </button>
            </form>
          </div>
        </div>
        <div className="relative flex items-center justify-center main-image rounded-2xl">
          <div className="absolute top-0 left-0 w-full h-full shadow-inner image-wraper border-box">
            <LazyLoadImage
              src={imageList[currentIndex].src}
              alt={`frame${currentIndex}`}
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </div>
        <p className="text-center text-[14px] leading-[22px] -mt-5 font-medium text-[#7f7f7f] ">
          By joining, you agree to our{" "}
          <span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-[#7f7f7f]">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline decoration-dotted decoration-2 underline-offset-4 decoration-[#7f7f7f]">
            Privacy Policy
          </span>
        </p>
      </main>
    </div>
  );
};

export default SignUp