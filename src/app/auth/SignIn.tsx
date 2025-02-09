"use client";

import React, {
  useEffect,
  useState,
} from 'react';

import {
  signIn,
  useSession,
} from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import loginImg from '../../../public/assets/images/signup image.webp';

// interface Props {}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <div className="relative w-full h-screen bg-zinc-900/90">
        <Image
          className="absolute object-cover w-full h-full mix-blend-overlay"
          src={loginImg}
          alt="/"
          fill
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center h-full">
          <form
            className="max-w-[400px] rounded-xl w-full mx-auto bg-white p-8"
            onSubmit={handleSignIn}
          >
            <h2 className="py-4 text-4xl font-bold text-center font-high">
              MONOCHROME.
            </h2>
            {error && (
              <p className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-lg">
                {error}
              </p>
            )}
            <div className="flex flex-col mt-5 mb-4 font-semibold font-jakarta">
              <label>Email</label>
              <input
                className="relative p-2 bg-gray-100 rounded-lg border font-medium focus:outline-black text-[#7f7f7f] solid"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col font-semibold font-jakarta ">
              <label>Password</label>
              <input
                className="relative p-2 bg-gray-100 rounded-lg border font-medium focus:outline-black text-[#7f7f7f] solid"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleGoogleSignIn}
                className="w-full py-3 mt-8 bg-[#ef5350] font-semibold font-jakarta hover:bg-transparent hover:border-[3px] rounded-lg hover:border-[#ef5350] hover:text-[#ef5350] relative text-white"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn