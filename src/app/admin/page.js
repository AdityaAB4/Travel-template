"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthContext from "../contexts/AuthContext";
import EditPackageModal from "../components/EditPackageModal";

import { toast, ToastContainer } from "react-toastify";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdViewCarousel } from "react-icons/md";

export default function page() {
  const { user, logout } = useContext(AuthContext);
  const { setUserRole } = useUser();
  const [code, setCode] = useState("admin");
  const [role, setRole] = useState("admin");
  const router = useRouter();
  const [editingPackage, setEditingPackage] = useState(null);

  const handleSubmit = (e) => {};

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getAllPackages = async () => {
    setLoading(true);
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "GET",
      headers: {
        "X-Frontend-Domain": window.location.origin,
        // "X-Frontend-Domain": "localhost",
      },
    });
    const packageData = await result.json();
    console.log(packageData, "data");
    setPackages(packageData);
    setLoading(false);
  };

  const handleUpdate = (updatedPackage) => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg._id === updatedPackage._id ? updatedPackage : pkg
      )
    );
    setEditingPackage(null);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    if (!confirm("Are you sure you want to delete this item?")) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Item deleted successfully!");
        getAllPackages(); // Refresh the UI after deletion
      } else {
        toast.error(data.message || "Failed to delete item");
        console.log(data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  const addPackageHandler = () => {
    router.push("/AddPackage");
  };

  const carouselMgmtHandler = () => {
    router.push("/carousel-management");
  };

  const handleShowClick = (_id) => {
    router.push(`/package-details/${_id}`);
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.replace("/auth");
    }
    setRole("admin");
    getAllPackages();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="hidden sm:flex justify-between items-center mx-4 sm:mx-auto sm:my-4 sm:max-w-6xl">
        <button
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer"
          onClick={addPackageHandler}
        >
          <div className="flex items-center justify-center">
            <IoMdAddCircleOutline /> &nbsp; Add Package
          </div>
        </button>
        <button
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer"
          onClick={carouselMgmtHandler}
        >
          <div className="flex items-center justify-center">
            <MdViewCarousel /> &nbsp; Carousel Management
          </div>
        </button>
        <button
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer"
          onClick={logout}
        >
          <div className="flex items-center justify-center">
            Logout &nbsp; <FiLogOut />
          </div>
        </button>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around items-center py-3 sm:hidden z-20">
        <button
          className="flex flex-col items-center text-pink-600 hover:text-pink-700 transition-all"
          onClick={addPackageHandler}
        >
          <IoMdAddCircleOutline className="text-2xl" />
          <span className="text-xs mt-1">Add Package</span>
        </button>

        <button
          className="flex flex-col items-center text-pink-600 hover:text-pink-700 transition-all"
          onClick={carouselMgmtHandler}
        >
          <MdViewCarousel className="text-2xl" />
          <span className="text-xs mt-1">Carousel</span>
        </button>

        <button
          className="flex flex-col items-center text-pink-600 hover:text-pink-700 transition-all"
          onClick={logout}
        >
          <FiLogOut className="text-2xl" />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>

      {!editingPackage && (
        <section className="py-16 bg-white text-gray-800 my-4">
          <div className="max-w-6xl mx-auto px-4">
            {/* <h1 className="my-4">
            {role === "admin" && <span>Welcome {role}</span>}
          </h1> */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Admin</h2>
              {/* <a href="#" className="text-pink-600 hover:underline">
                View All Offers
              </a> */}
            </div>
            {loading ? (
              <div className="flex items-center justify-center">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.length > 0 &&
                  packages.map((item, i) => (
                    <div
                      key={item?._id}
                      className="border border-pink-400 rounded-xl overflow-hidden hover:shadow-lg transition-shadow relative"
                    >
                      {/* Admin Actions */}
                      <div className="absolute top-2 right-2 flex space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm z-10">
                        <button
                          onClick={() => setEditingPackage(item)}
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="cursor-pointer text-red-600 hover:text-red-800"
                          disabled={deleteLoading}
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => handleShowClick(item._id)}
                          className="cursor-pointer text-yellow-600 hover:text-yellow-800"
                        >
                          {item.disabled ? (
                            <FaEyeSlash className="h-5 w-5" />
                          ) : (
                            <FaEye className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {/* Card Content */}
                      {
                        <div
                          className={`relative ${
                            item.disabled ? "opacity-50 grayscale" : ""
                          }`}
                        >
                          <div className="relative h-50  pb-2/3">
                            <Image
                              src={item?.imageUrl || null}
                              layout="fill"
                              alt={item?.packageName}
                              className="absolute w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-pink-600 font-bold">
                                30% OFF
                              </span>
                              <span className="text-gray-500">5 days left</span>
                            </div>
                            <h3 className="font-bold mb-2">
                              {item.packageName}
                            </h3>
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
      )}
      {/* Edit Modal */}
      {editingPackage && (
        <EditPackageModal
          packageData={editingPackage}
          onClose={() => setEditingPackage(null)}
          onUpdate={handleUpdate}
        />
      )}
      <Footer />
      <ToastContainer />
    </main>
  );
}
