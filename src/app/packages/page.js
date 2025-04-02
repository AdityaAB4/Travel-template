"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";
import { useUser } from "../contexts/UserContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const page = () => {
  const { role } = useUser();

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

  const getAllPackages = async () => {
    setLoading(true);
    const result = await fetch(
      "https://travel-template-backend.onrender.com/api/packages"
    );
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

  return (
    <main>
      <Navbar />
      <section className="py-16 bg-white">
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
            <div className="flex items-center justify-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.length &&
                packages.map((item, i) => (
                  <div
                    key={item?._id}
                    className="border border-pink-400 rounded-xl overflow-hidden hover:shadow-lg transition-shadow relative"
                  >
                    {/* Admin Actions */}
                    {role === "admin" && (
                      <div className="absolute top-2 right-2 flex space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm z-10">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleToggleDisable(item.id)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          {item.disabled ? (
                            <FaEyeSlash className="h-5 w-5" />
                          ) : (
                            <FaEye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Card Content */}
                    {
                      <div
                        className={`relative text-gray-800 ${
                          item.disabled ? "opacity-50 grayscale" : ""
                        }`}
                      >
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
                              disabled={item.disabled}
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
      <Footer />
    </main>
  );
};

export default page;
