"use client"

import { useState } from 'react';

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

import PhotoDetailsModal from './PhotoDetailsModal';

interface ImageModalProps {
  image: {
    src: string;
  };
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const [isCollected, setIsCollected] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<string>("Anonymous");

  if (!image) return null;

  // Later you can update it after auth:
  // useEffect(() => {
  //   if (session?.user?.name) {
  //     setUser(session.user.name);
  //   }
  // }, [session]);

  const handleDownload = async () => {
    try {
      // Get the original image URL (if it's a Next.js optimized image)
      const originalSrc = image.src.includes("/_next/image")
        ? new URL(image.src).searchParams.get("url") || image.src
        : image.src;

      // Decode the URL if it's encoded
      const decodedSrc = decodeURIComponent(originalSrc);

      // Fetch the image
      const response = await fetch(decodedSrc);

      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();

      // Get the content type from the response
      const contentType = response.headers.get("content-type") || "image/jpeg";

      // Determine file extension based on content type
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

      // Create download link
      const blobUrl = window.URL.createObjectURL(
        new Blob([blob], { type: contentType })
      );

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image${getExtension(contentType)}`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  const openImageDetailsModal = () => {
    //  setSelectedImageDetails(image); // Set the image for details modal
    setShowDetailsModal(true); // Open the PhotoDetailsModal
  };

  const closeImageDetailsModal = () => {
    setShowDetailsModal(false);
  };

  // Handle collection toggle
  const handleCollection = () => {
    setIsCollected(!isCollected);
    // Additional logic for when an item is collected or uncollected
  };

  // Handle likes increment
  const handleLikes = () => {
    // setLikes((prevLikes) => prevLikes + 1);
    setIsLiked(!isLiked); // Correctly increment likes
    // Additional logic for when an item is liked
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
              <div className="w-12 h-12 rounded-full ">
                <FaUser className="text-3xl" />
              </div>
              <p className="text-lg font-jakarta font-medium ">{user}</p>
            </div>
            <div className="flex items-center justify-between lg:w-1/2 max-sm:w-full md:w-full">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleCollection}
                  className="px-4 py-3 text-[#000000] font-semibold flex items-center justify-center gap-2 bg-transparent rounded-lg border-[1px] hover:border-[#bfbdbd]"
                >
                  <FaBookmark className="text-xl" />
                  <span className="hidden lg:inline-block font-medium font-jakarta">
                    {isCollected ? "Collected" : "Collect"}
                  </span>
                </button>
                <button
                  onClick={handleLikes}
                  className="px-4 py-3 text-[#000000] font-jakarta font-semibold flex items-center justify-center gap-2 bg-transparent rounded-lg border-[1px] hover:border-[#bfbdbd]"
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
                className="px-4 py-3 text-white font-jakarta bg-[#ef5350] rounded-lg hover:bg-[#de3e3b] ease-in-out duration-150 transition-shadow"
              >
                Free Download
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full max-w-2xl p-4 mx-auto">
            <div className="w-full h-full">
              <Image
                width={100}
                height={100}
                src={image.src}
                alt="Modal"
                className="w-full h-full rounded-xl"
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
                className="px-4 py-2 text-[#000000] flex items-center justify-center gap-2 bg-transparent rounded-lg border-[1px] hover:border-[#bfbdbd]"
              >
                <FaCircleInfo
                  className="fa-solid fa-circle-info"
                  style={{ color: "#5c5c5c" }}
                ></FaCircleInfo>
                <span className="hidden font-jakarta md:inline-block">More info</span>
              </button>
              <button className="px-4 py-2 text-[#000000] flex items-center justify-center gap-2 bg-transparent rounded-lg border-[1px] hover:border-[#bfbdbd]">
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
    </div>
  );
}

export default ImageModal