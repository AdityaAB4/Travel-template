"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_CAROUSEL_URL}/`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowClick = (_id) => {
    router.push(`/packages`);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        images.length > 0 && (
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Navigation, Pagination]}
            className="h-full"
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
                  <Image
                    src={item?.imageUrl || ""}
                    alt={item?.title || `Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute bottom-8 sm:bottom-16 left-4 sm:left-10 text-white z-20 max-w-xs sm:max-w-md">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-3 drop-shadow-lg">
                      Your Dream Vacation Starts Here
                    </h2>
                    <button
                      className="cursor-pointer px-5 py-2 sm:px-6 sm:py-3 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors text-sm sm:text-base"
                      onClick={() => handleShowClick()}
                    >
                      View Packages
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}
    </div>
  );
};

export default Carousel;
