"use client"

import React, {
  useEffect,
  useState,
} from 'react';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaAngleDown,
  FaBell,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import {
  FaEllipsis,
  FaXTwitter,
} from 'react-icons/fa6';

import UserModal from '@components/UserModal';

// import { signOut } from "next-auth/react";

interface User {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Props {
  user?: User | null;
}

const Navbar: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    // If authentication fails, redirect to home
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change this value to the scroll distance at which you want the navbar to become sticky
      const scrollThreshold = 400;
      setIsSticky(scrollPosition > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDotDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleExploreDropdown = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderUserActions = () => {
    if (!user) {
      return (
        <button
          className="flex items-center max-sm:hidden justify-center text-white tracking-wider px-[16px] outline-none border-none max-sm:py-[7px] font-semibold max-sm:px-[20px] max-sm:text-base md:text-lg 2xl:text-[16px] 2xl:leading-[20.8px] transition ease-in delay-150 hover:translate-y-1 hover:scale-40 duration-300 py-[10px] rounded-lg"
          onClick={() => setShowUserModal(true)}
        >
          Join
        </button>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Link href="/upload">
          <button className="flex items-center justify-center text-white tracking-wider px-[16px] py-[10px] outline-none border-none font-semibold rounded-lg hover:bg-gray-700 transition-colors">
            Upload
          </button>
        </Link>

        <div className="relative">
          <button className="text-white hover:text-gray-300">
            <FaBell size={20} />
          </button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsUserDropdownOpen(true)}
          onMouseLeave={() => setIsUserDropdownOpen(false)}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <FaAngleDown className="text-white" />
          </div>

          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link href="/profile">
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </span>
                </Link>
                <Link href="/settings">
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className=" w-full flex bg-[#0f0f0f] pb-5 flex-col items-center">
        <div
          className={`z-10 py-0 flex flex-row items-center content-center justify-between w-full border-box px-10 max-sm:px-4 md:px-10 lg:px-10 xl:px-10 2xl:px-20 ${
            isSticky ? "sticky top-0 bg-[#0f0f0f]" : ""
          } `}
        >
          <h1 className="flex font-high items-center justify-center pt-2 text-[50px] max-sm:text-[40px] text-[#ffffff]">
            m
          </h1>
          <div className="flex items-center font-jakarta lg:gap-8 2xl:gap-8 max-sm:gap-3 md:gap-4">
            <div
              className="relative flex items-center gap-2 max-sm:hidden md:inline-flex lg:inline-flex 2xl:inline-flex"
              onClick={toggleExploreDropdown}
            >
              <p className="text-[16px] font-semibold leading-[26px] text-white cursor-pointer hover:text-gray-300">
                Explore
              </p>
              <FaAngleDown
                className={`text-white text-xs mt-1 cursor-pointer ${
                  isExploreOpen ? "rotate-180" : ""
                }`}
              />
              {isExploreOpen && (
                <div className="absolute z-20 bg-white rounded-lg shadow-lg -right-6 top-12 w-44">
                  <div className="tooltip-arrow"></div>
                  <div className="flex flex-col w-full py-2 font-semibold font-jakarta">
                    <Link
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Discover Photos
                    </Link>
                    <Link
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Popular searches
                    </Link>
                    <Link
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Leaderboard
                    </Link>
                    <Link
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Challenges
                    </Link>
                    <Link
                      target="_blank"
                      href="https://monoblog.framer.website/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/store">
              <p className="text-[16px] font-semibold leading-[26px] text-white cursor-pointer max-sm:hidden md:inline-flex lg:inline-flex 2xl:inline-flex hover:text-gray-300">
                Store
              </p>
            </Link>

            <div className="relative max-sm:hidden md:inline-flex lg:inline-flex 2xl:inline-flex">
              <FaEllipsis
                className="text-white cursor-pointer"
                onClick={toggleDotDropdown}
              />
              {isOpen && (
                <div className="absolute z-20 mt-10 bg-white rounded-lg shadow-lg -right-6 w-44">
                  <div className="tooltip-arrow"></div>
                  <div className="flex flex-col w-full py-2 font-semibold font-jakarta">
                    <Link
                      href="/Login"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                    <Link
                      href="/SignUp"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Join
                    </Link>
                    <Link
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Image & Video API
                    </Link>
                    <Link
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/"
                      className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Partnerships
                    </Link>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                    <div className="flex items-center w-full gap-4 px-4 py-2">
                      <Link
                        target="_blank"
                        href="https://twitter.com/i_am_monochrome"
                        rel="noreferrer"
                      >
                        <FaXTwitter />
                      </Link>
                      <Link
                        target="_blank"
                        href="https://www.instagram.com/i.am.monochrome/"
                        rel="noreferrer"
                      >
                        <FaInstagram />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {renderUserActions()}
            {/* <button
              className={` flex items-center max-sm:hidden justify-center text-white tracking-wider px-[16px] outline-none border-none max-sm:py-[7px] font-semibold max-sm:px-[20px] max-sm:text-base md:text-lg 2xl:text-[16px] 2xl:leading-[20.8px] transition ease-in delay-150 hover:translate-y-1 hover:scale-40 duration-300 py-[10px] rounded-lg`}
              type="button"
              onClick={() => setShowUserModal(true)}
            >
              Join
            </button> */}
            <div className="max-sm:flex md:hidden lg:hidden 2xl:hidden items-center gap-1 justify-center">
              <div className=" w-1 h-1 bg-[#ffffff] rounded-full"></div>
              <p
                className=" text-white font-normal font-jakarta text-lg"
                onClick={toggleNavMenu}
              >
                menu
              </p>
            </div>

            {/* <i
              className="fa-solid fa-bars fa-lg md:hidden lg:hidden 2xl:hidden"
              style={{ color: "#ffffff" }}
              onClick={toggleNavMenu}
            ></i> */}
            {isNavOpen && (
              <div className="fixed inset-0 z-50 bg-black">
                <nav className="fixed top-0 left-0 flex flex-col items-start w-full h-full px-5 ">
                  <div className="flex items-center w-full gap-4 ">
                    <h1 className="font-high text-[50px] mt-5 max-sm:text-[40px] text-[#ffffff]">
                      m
                    </h1>
                    <form className="w-full max-sm:max-w-[230px] lg:max-w-lg md:max-w-2xl">
                      <div className="relative flex items-center">
                        <i className="fa-solid absolute w-[5px] h-[5px] pointer-events-none ml-3 fa-magnifying-glass fa-beat-fade"></i>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search Images..."
                          autoComplete="off"
                          className="w-full px-3 py-[4px] md:py-[7px] mt-3 pl-10 font-medium placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 font-sans"
                          // value={searchValue}
                          // onChange={(e) => setSearchValue(e.target.value)}
                        ></input>
                      </div>
                    </form>
                  </div>
                  <div className=" w-full h-[0.2px] mt-3 bg-gray-700"></div>
                  <ul className="flex flex-col items-start text-xl font-semibold text-white font-jakarta ">
                    <li className="py-2 mt-4 hover:text-gray-300">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <Link href="/">Discover Photos</Link>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <Link href="/">Popular Searches</Link>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <Link href="/">Free Videos</Link>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <Link href="/">Challenges</Link>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <Link
                        target="_blank"
                        href="https://monoblog.framer.website/"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                  <div className=" w-full h-[0.2px] mt-6 bg-gray-700"></div>
                  <ul className="flex flex-col items-start text-xl font-semibold text-white font-jakarta">
                    <li className="py-2 mt-6 hover:text-gray-300">
                      <Link href="/Login">Login</Link>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <Link href="/SignUp">Join</Link>
                    </li>
                  </ul>
                  <div className=" w-full h-[0.2px] mt-6 bg-gray-700"></div>
                  <ul className="flex flex-col items-start text-xl font-semibold text-white font-jakarta">
                    <li className="py-2 mt-6 hover:text-gray-300">
                      <Link href="/">FAQ</Link>
                    </li>
                    <li className="py-2 hover:text-gray-300">
                      <Link href="/">About Us</Link>
                    </li>
                  </ul>
                  <div className=" w-full h-[0.2px] my-6 bg-gray-700"></div>
                  <div className="flex items-center w-full gap-10">
                    <Link
                      target="_blank"
                      href="https://twitter.com/i_am_monochrome"
                      rel="noreferrer"
                    >
                      <i
                        className="fa-brands fa-x-twitter fa-2xl"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </Link>
                    <Link
                      target="_blank"
                      href="https://www.instagram.com/i.am.monochrome/"
                      rel="noreferrer"
                    >
                      <i
                        className="fa-brands fa-instagram fa-2xl"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </Link>
                  </div>
                  <button
                    className="absolute p-4 right-1 top-4 md:top-6"
                    onClick={toggleNavMenu}
                  >
                    <i className="text-white fas fa-times fa-xl"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
        <div className="w-full font-high overflow-hidden">
          <h4
            className="text-[220px] font-bold text-center text-white"
            style={{ whiteSpace: "nowrap" }}
          >
            monochrome.
          </h4>
        </div>
        <div className="w-full items-end max-sm:hidden md:hidden lg:flex gap-4 justify-end px-10">
          <Link href="/">
            <div className="w-12 h-12 rounded-full flex items-center border-[1px] border-white justify-center transition-colors duration-1000 hover:text-blue-500">
              <FaXTwitter className="text-white transition-colors duration-1000 hover:text-black" />
            </div>
          </Link>
          <Link href="/">
            <div className="w-12 h-12 rounded-full flex items-center border-[1px] border-white justify-center transition-colors duration-1000 hover:text-blue-500">
              <FaInstagram className="text-white transition-colors duration-1000 hover:text-black" />
            </div>
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/webdevmaurice/"
            rel="noreferrer"
          >
            <div className="w-12 h-12 rounded-full flex items-center border-[1px] border-white justify-center transition-colors duration-1000 hover:text-black">
              <FaLinkedinIn className="text-white transition-colors duration-1000 hover:text-black" />
            </div>
          </Link>
        </div>
      </div>
      {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}
    </>
  );
};

export default Navbar