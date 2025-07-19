"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SwiperCore from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { FiTrash2, FiUpload } from "react-icons/fi";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function page() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_CAROUSEL_URL}/`, {
        method: "GET",
        headers: {
          "X-Frontend-Domain": window.location.origin,
          // "X-Frontend-Domain": "localhost",
        },
      });
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_CAROUSEL_URL}/add`, {
        method: "POST",
        body: formData,
        headers: {
          "X-Frontend-Domain": window.location.origin,
          // "X-Frontend-Domain": "localhost",
        },
      });
      fetchImages();
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_CAROUSEL_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "X-Frontend-Domain": window.location.origin,
          // "X-Frontend-Domain": "localhost",
        },
      });
      fetchImages();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const backClickHandler = () => {
    router.back();
  };

  //   <div className="max-w-4xl mx-auto py-10 mb-10 text-gray-700">
  //     <h1 className="text-3xl font-bold text-center mb-6">
  //       Carousel Manager
  //     </h1>
  //     <div className="flex gap-4 mb-6 items-center justify-center">
  //       <input
  //         type="file"
  //         onChange={handleFileChange}
  //         className="border p-2 rounded"
  //       />
  //       <button
  //         onClick={handleUpload}
  //         disabled={loading}
  //         className="bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600 disabled:opacity-50"
  //       >
  //         {loading ? "Uploading..." : "Upload"}
  //       </button>
  //     </div>

  //     {/* Carousel Preview */}
  //     {images.length > 0 && (
  //       <Swiper
  //         spaceBetween={30}
  //         centeredSlides={true}
  //         navigation={true}
  //         autoplay={{
  //           delay: 5000,
  //           disableOnInteraction: false,
  //         }}
  //         pagination={{
  //           clickable: true,
  //         }}
  //         className="w-full h-full"
  //       >
  //         {images.map((img) => (
  //           <SwiperSlide key={img._id}>
  //             <div className="relative h-72 pb-2/3">
  //               <Image
  //                 src={img.imageUrl}
  //                 layout="fill"
  //                 className="absolute w-full h-full object-contain rounded-2xl"
  //                 alt="carousel"
  //               />
  //               <button
  //                 onClick={() => handleDelete(img._id)}
  //                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //     )}
  //   </div>
  return (
    <>
      <Navbar />
      <div>
        <button onClick={backClickHandler} className="mx-4 my-2 cursor-pointer">
          <span className="text-pink-500 ">Back</span>
        </button>
      </div>
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6">
          Carousel Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-pink-500 text-white cursor-pointer px-8 py-2 rounded shadow hover:bg-pink-600 disabled:opacity-50"
          >
            {loading ? (
              "Uploading..."
            ) : (
              <div className="flex justify-center items-center">
                <span>Upload &nbsp;</span>
                <FiUpload />{" "}
              </div>
            )}
          </button>
        </div>

        {/* Carousel Preview */}
        {images.length > 0 && (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto"
          >
            {images.map((img) => (
              <SwiperSlide key={img._id}>
                <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center bg-white rounded-2xl">
                  <Image
                    src={img.imageUrl}
                    layout="fill"
                    className="object-cover rounded-2xl"
                    alt="carousel"
                  />
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="cursor-pointer absolute top-2 right-2 bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600"
                  >
                    <div className="flex justify-center items-center">
                      <span>Delete &nbsp;</span>
                      <FiTrash2 />
                    </div>
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <Footer />
    </>
  );
}
