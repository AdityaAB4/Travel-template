"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import { FiShare2 } from "react-icons/fi";
import ShareModal from "../components/ShareModal";
import { FaEye } from "react-icons/fa";

const page = () => {
  const { role } = useUser();
  const router = useRouter();

  const HOT_DEALS = [
    {
      url: "https://plus.unsplash.com/premium_photo-1672855635926-c0c4c0483bf6?w=600&auto=format&fit=crop&q=80",
      discount: "35% OFF",
      title: "Maldives Escape",
    },
    {
      url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&h=700&q=80",
      discount: "35% OFF",
      title: "Maldives Escape",
    },
    {
      url: "https://images.unsplash.com/photo-1742275346989-2d696fa2c9b3?w=600&auto=format&fit=crop&q=80",
      discount: "35% OFF",
      title: "Maldives Escape",
    },
  ];

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [sharePackageUrl, setSharePackageUrl] = useState(null);

  const handleOpenShareModal = (pkg) => {
    const packageUrl = `https://travel-mvp-dev.vercel.app/package-details/${pkg._id}`;
    setSharePackageUrl(packageUrl);
  };

  const getAllPackages = async () => {
    setLoading(true);
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "GET",
      headers: {
        "X-Frontend-Domain": window.location.hostname,
      },
    });
    const packageData = await result.json();
    console.log(packageData, "data");
    setPackages(packageData);
    setLoading(false);
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit item:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete item:", id);
  };

  const handleToggleDisable = (id) => {
    console.log("Toggle disable for:", id);
  };

  const handleShowClick = (_id) => {
    router.push(`/package-details/${_id}`);
  };

  return (
    <main>
      <Navbar />
      <section className="py-16 bg-white max-h-max min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="my-4">
            {role === "admin" && <span>Welcome {role}</span>}
          </h1>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700">
              Explore our packages
            </h2>
            <a href="#" className="text-pink-600 hover:underline">
              View All Offers
            </a>
          </div>
          {loading ? (
            <div className="flex justify-center items-center my-8">
              <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.length &&
                packages.map((item, i) => (
                  <div
                    key={item?._id}
                    className=" border border-pink-400 rounded-xl overflow-hidden hover:shadow-lg transition-shadow relative"
                  >
                    {/* Card Content */}
                    {
                      <div
                        className={`relative text-gray-800 ${
                          item.disabled ? "opacity-50 grayscale" : ""
                        }`}
                      >
                        <div className="absolute cursor-pointer  top-3 right-3 z-20 bg-pink-400 shadow-md rounded-2xl flex justify-center items-center px-2 py-2">
                          <button
                            onClick={() => handleOpenShareModal(item)}
                            className="cursor-pointer"
                          >
                            <FiShare2
                              size={20}
                              className="text-gray-600 hover:text-white"
                            />
                            {/* <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-pink-500 text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                              Share Package
                            </div> */}
                          </button>
                        </div>
                        <div className="absolute cursor-pointer top-14 right-3 z-20 bg-pink-400 shadow-md rounded-2xl flex justify-center items-center px-2 py-2">
                          <button
                            onClick={() => handleShowClick(item._id)}
                            className="cursor-pointer "
                          >
                            <FaEye
                              size={20}
                              className="text-gray-600 hover:text-white"
                            />
                            {/* <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-pink-500 text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                              Share Package
                            </div> */}
                          </button>
                        </div>
                        <div className="relative h-50  pb-2/3">
                          <Image
                            src={item?.imageUrl || null}
                            alt={item?.packageName}
                            layout="fill"
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-pink-600 font-bold">
                              30% OFF
                            </span>
                            <span className="text-gray-500">5 days left</span>
                          </div>
                          <h3 className="font-bold mb-2">{item.packageName}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">
                              INR&nbsp;{item.price}
                            </span>
                            <button
                              className={`px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer ${
                                item.disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              onClick={() => handleShowClick(item._id)}
                              // disabled={item.disabled}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
      {sharePackageUrl && (
        <ShareModal
          packageUrl={sharePackageUrl}
          onClose={() => setSharePackageUrl(null)}
        />
      )}
      <Footer />
    </main>
  );
};

export default page;
