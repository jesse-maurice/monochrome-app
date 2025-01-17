"use client"

import React, {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import {
  FaDownload,
  FaHeart,
  FaRegBookmark,
} from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import BookmarkModal from './BookmarkModal';
import ImageModal from './ImageModal';

interface Image {
  src: string;
  tag: string[];
  camera: string;
}

interface Likes {
  [key: number]: boolean;
}

const ImageGrid = () => {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [likes, setLikes] = useState<Likes>({});
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);

  const toggleBookmarkModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default action
    e.stopPropagation(); // Stop the event from bubbling up
    setShowBookmarkModal(!showBookmarkModal);
  };

  const shuffleArray = (array: Image[]): Image[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup function to clear the timeout when component unmounts
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    // Filter images based on searchValue
    const filtered = images.filter((image) =>
      image.tag.some((tag) =>
        tag.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredImages(filtered);
  }, [searchValue, images]);

  useEffect(() => {
    // Fetch images from your API
    const fetchImages = async () => {
      const response = await fetch('/api/images');
      const data = await response.json();
      setImages(shuffleArray(data));
    };

    fetchImages();
  }, []);

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleLike = (index: number) => {
    setLikes((prevLikes: Likes) => {
      // Copy the current likes state
      const newLikes = { ...prevLikes };

      // Toggle the like status for the specific image
      newLikes[index] = !newLikes[index];

      return newLikes;
    });
  };




  return (
    <div className="px-4 grid-container bg-[#0f0f0f] lg:px-10 max-sm:px-4 md:px-10 xl:px-10 2xl:px-32">
      <div className="flex py-[40px] lg:py-[60px] flex-row content-center justify-between w-full">
        <h1 className="text-4xl text-white font-medium  font-jakarta max-sm:hidden">
          Free Stock Photos
        </h1>
        <form className="w-full max-sm:max-w-md lg:max-w-lg md:max-w-sm">
          <div className="relative flex items-center">
            <FaMagnifyingGlass className="absolute text-[13px] ml-3 pointer-events-none" />
            <input
              type="text"
              name="search"
              placeholder="Search Images..."
              autoComplete="off"
              className="w-full px-3 py-[10px] max-sm:py-[15px] pl-10 font-medium placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 font-sans"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-[30px] md:gap-[20px] max-sm:gap-[25px]">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full bg-gray-300 rounded-lg h-60"></div>
            </div>
          ))}
        </div>
      ) : (
        <ResponsiveMasonry>
          <Masonry columnsCount={3} gutter="25px">
            {filteredImages.map((image, index) => (
              <li
                key={`image-${index}`}
                className="relative list-none cursor-pointer "
                onClick={() => openModal(image)}
              >
                <LazyLoadImage
                  src={image.src}
                  alt={`frame${index}`}
                  className="w-auto h-auto cursor-pointer rounded-xl
                  "
                  // loading="lazy"
                />
                <div className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-0 hover:bg-opacity-10">
                  <div className="flex items-center w-full h-full gap-2 transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <button
                      onClick={toggleBookmarkModal}
                      className="p-3 absolute top-3 right-[60px] text-[#ffffff] hover:bg-[#191919] hover:bg-opacity-50 font-semibold flex items-center justify-center gap-2 bg-transparent rounded-xl hover:border-[#bfbdbd]"
                    >
                      <FaRegBookmark className="text-xl" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(index);
                      }}
                      className="p-3 text-[#ffffff] absolute top-3 right-2 hover:bg-[#191919] hover:bg-opacity-50 font-semibold flex items-center justify-center gap-2 bg-transparent rounded-xl hover:border-[#bfbdbd]"
                    >
                      <FaHeart
                        className={
                          likes[index]
                            ? "fa-solid text-xl fa-heart text-red-500 heart-pulse"
                            : "fa-regular fa-heart text-xl"
                        }
                      />
                    </button>

                    <Link
                      href={image.src}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center font-medium absolute bottom-5 right-5 max-sm:bg-transparent md:bg-[#ffffff] max-sm:text-[#ffffff] md:text-black md:rounded-lg md:py-3 md:px-3 md:hover:bg-[#ffffff] lg:bg-[#ef5350] lg:hover:bg-[#c85655] max-sm:hover:bg-[#ffffff]  max-sm:hover:text-black max-sm:hover:rounded-lg max-sm:hover:px-3 max-sm:hover:py-3 lg:py-2 lg:px-3 lg:rounded-xl content-center justify-center gap-2 lg:text-[#ffffff]"
                    >
                      <FaDownload />
                      <span className="hidden font-jakarta lg:inline">
                        Download
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
      {showBookmarkModal && (
        <BookmarkModal
          isOpen={showBookmarkModal}
          onClose={() => setShowBookmarkModal(false)}
        />
      )}
    </div>
  );
}

export default ImageGrid;