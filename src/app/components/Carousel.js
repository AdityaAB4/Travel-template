"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const Carousel = () => {
  // const images = [
  //   "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1920",
  //   "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920",
  //   "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920",
  // ];

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_CAROUSEL_URL}/`);
      const data = await res.json();
      setImages(data);
      setLoading(false);
      console.log(data, "images");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="relative w-full h-[600px]">
      {loading && (
        <div className="my-4 flex justify-center items-center text-gray-700">
          Loading...
        </div>
      )}
      {images && images.length > 0 && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="mySwiper h-full"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={item?.imageUrl || null}
                  alt="Travel Package"
                  width={1920}
                  height={800}
                  className="object-cover"
                  key={item?._id}
                />
                {/* Optional overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Optional text content */}
                <div className="absolute bottom-20 left-10 text-white z-10">
                  <h2 className="text-4xl font-bold mb-4">
                    Your Dream Vacation Starts Here
                  </h2>
                  <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
