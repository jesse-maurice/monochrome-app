"use client";

import {
  useEffect,
  useState,
} from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  FaBookmark,
  FaCircleCheck,
  FaCircleInfo,
  FaHeart,
  FaUpRightFromSquare,
  FaUser,
  FaXmark,
} from 'react-icons/fa6';

import LoginModal from './LoginModal';
import PhotoDetailsModal from './PhotoDetailsModal';
import SignUpModal from './SignUpModal';

interface ImageModalProps {
  image: {
    src: string;
  };
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const { data: session, status } = useSession();
  const [isCollected, setIsCollected] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [imageOrientation, setImageOrientation] = useState<
    "portrait" | "landscape"
    >("portrait");
  
  const handleModalSwitch = (modalType: "signup" | "login") => {
    if (modalType === "login") {
      setShowSignUpModal(false);
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
      setShowSignUpModal(true);
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      const img = await new Promise<HTMLImageElement>((resolve) => {
        const imgElement = document.createElement("img");
        imgElement.onload = () => resolve(imgElement);
        imgElement.src = image.src;
      });

      setImageOrientation(img.width > img.height ? "landscape" : "portrait");
    };

    loadImage();
  }, [image.src]);

  if (!image) return null;

  const handleDownload = async () => {
    if (status !== "authenticated") {
      setShowSignUpModal(true);
      return;
    }

    try {
      const originalSrc = image.src.includes("/_next/image")
        ? new URL(image.src).searchParams.get("url") || image.src
        : image.src;

      const decodedSrc = decodeURIComponent(originalSrc);
      const response = await fetch(decodedSrc);

      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const contentType = response.headers.get("content-type") || "image/jpeg";

      const getExtension = (contentType: string) => {
        switch (contentType) {
          case "image/png":
            return ".png";
          case "image/jpeg":
            return ".jpg";
          case "image/webp":
            return ".webp";
          default:
            return ".jpg";
        }
      };

      const blobUrl = window.URL.createObjectURL(
        new Blob([blob], { type: contentType })
      );

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image${getExtension(contentType)}`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  const openImageDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const closeImageDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleCollection = () => {
    setIsCollected(!isCollected);
  };

  const handleLikes = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-90">
      <div className="w-full h-full px-4 pt-4 pb-4 scrollable-hidden max-sm:h-auto max-sm:px-0 md:px-24 lg:px-40 md:pt-10 md:pb-10">
        <button
          onClick={onClose}
          className="absolute flex items-center justify-center text-white border-none rounded-full outline-none top-16 lg:left-24 md:left-12 max-sm:top-4 max-sm:left-5"
        >
          <FaXmark className="text-3xl" />
        </button>
        <div className="w-full px-4 py-5 m-auto bg-white shadow modal-container rounded-2xl max-sm:rounded-none max-sm:py-3 max-sm:px-0 lg:px-10">
          <div className="flex flex-col items-center justify-between py-3 md:w-full max-sm:py-0 md:flex-row max-sm:px-4 md:px-4">
            <div className="items-center hidden gap-3 mb-4 md:w-1/2 lg:inline-flex md:mb-0">
              {status === "authenticated" && session.user ? (
                <div className="flex items-center gap-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser className="text-gray-600 text-xl" />
                    </div>
                  )}
                  <p className="text-lg font-jakarta font-medium">
                    {session.user.name || "User"}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600 text-xl" />
                  </div>
                  <p className="text-lg font-jakarta font-medium"></p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between lg:w-1/2 max-sm:w-full md:w-full">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleCollection}
                  className="px-4 py-3 text-[#000000] font-semibold flex items-center justify-center gap-2 bg-transparent rounded-xl border-[1px] hover:border-[#191919] hover:bg-gray-100"
                >
                  <FaBookmark className="text-xl" />
                  <span className="hidden lg:inline-block font-medium font-jakarta">
                    {isCollected ? "Collected" : "Collect"}
                  </span>
                </button>
                <button
                  onClick={handleLikes}
                  className="px-4 py-3 text-[#000000] font-jakarta font-semibold flex items-center justify-center gap-2 bg-transparent rounded-xl border-[1px] hover:border-[#191919] hover:bg-gray-100"
                >
                  <FaHeart
                    className={
                      isLiked
                        ? "fa-solid fa-heart text-xl text-red-500"
                        : "fa-regular fa-heart text-xl"
                    }
                  ></FaHeart>
                  <span className="hidden font-medium lg:inline-block">
                    {isLiked ? "Unlike" : "Like"}
                  </span>
                </button>
              </div>

              <button
                onClick={handleDownload}
                className="px-4 py-3 text-white font-jakarta bg-[#ef5350] rounded-xl hover:bg-[#de3e3b] ease-in-out duration-150 transition-shadow"
              >
                Free Download
              </button>
            </div>
          </div>
          <div className="flex w-full max-w-4xl p-4 mx-auto">
            <div className="w-full flex items-center justify-center">
              <Image
                width={imageOrientation === "landscape" ? 1000 : 482}
                height={imageOrientation === "landscape" ? 600 : 722}
                src={image.src}
                alt="Modal"
                className={`rounded-xl 
                  ${
                    imageOrientation === "landscape"
                      ? "w-full h-auto"
                      : "w-[482px] h-[722px] max-sm:w-full max-sm:h-auto"
                  }`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="flex px-4 items-center justify-between w-full">
            <div className="flex w-full items-center justify-start gap-2">
              <FaCircleCheck
                className="fa-solid fa-circle-check"
                style={{ color: "#acacae" }}
              ></FaCircleCheck>
              <p className="font-jakarta">Free to use</p>
            </div>
            <div className="flex items-center justify-end w-full gap-2 py-8 max-sm:py-1">
              <button
                onClick={openImageDetailsModal}
                className="px-4 py-3 text-[#000000] flex items-center justify-center gap-2 bg-transparent rounded-xl border-[1px] hover:border-[#191919] hover:bg-gray-100"
              >
                <FaCircleInfo
                  className="fa-solid fa-circle-info"
                  style={{ color: "#5c5c5c" }}
                ></FaCircleInfo>
                <span className="hidden font-jakarta md:inline-block">
                  More info
                </span>
              </button>
              <button className="px-4 py-3 text-[#000000] flex items-center justify-center gap-2 bg-transparent rounded-xl border-[1px] hover:border-[#191919] hover:bg-gray-100">
                <FaUpRightFromSquare
                  className="fa-solid fa-up-right-from-square"
                  style={{ color: "#5c5c5c" }}
                ></FaUpRightFromSquare>
                <span className="hidden font-jakarta md:inline-block">
                  Share
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetailsModal && (
        <PhotoDetailsModal image={image} onClose={closeImageDetailsModal} />
      )}

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
};

export default ImageModal;
