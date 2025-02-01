'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import Footer from 'app/Footer/page';
import Navbar from 'app/Navbar/page';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ImageGrid from '@components/ImageGrid';

interface Image {
  src: string;
  tag: string[];
  camera: string;
}

const Home = () => {
  const { data: session } = useSession();
  const [images, setImages] = useState<Image[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('/api/images')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return <div>Loading...</div>;
  }



  return (
    <>
      <div className="w-full h-full">
        <Navbar user={session?.user} />
        <div className="relative flex flex-col w-full h-[700px] text-center bg-zinc-900/80">
          <div className="absolute top-0 left-0 w-full h-[700px] image-wrapper border-box"></div>
          <LazyLoadImage
            className="object-cover w-full h-full mix-blend-overlay"
            src={images[currentIndex].src}
            alt={`frames${currentIndex}`}
          />
          <div className="absolute inset-0 flex items-center justify-center ">
            <div className="flex flex-col text-center max-w-[600px] 2xl:max-w-[650px] max-sm:px-6 border-box pt-12"></div>
          </div>
        </div>
        <ImageGrid />
        <Footer />
      </div>
    </>
  );
};

export default Home;
