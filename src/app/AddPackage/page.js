"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { toast, ToastContainer } from "react-toastify";
import "react-quill-new/dist/quill.snow.css";

import { FiMinus } from "react-icons/fi";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const AddPackagePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    packageName: "",
    price: "",
    travelDatesFrom: "",
    travelDatesTo: "",
    packageDetails: "",
    inclusion: "",
    exclusion: "",
    image: null,
  });
  const [itinerary, setItinerary] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, { title: "", description: "" }]);
  };

  const removeItineraryDay = (indexToRemove) => {
    const updated = itinerary.filter((_, i) => i !== indexToRemove);
    setItinerary(updated);
  };

  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formPayload = new FormData();
    formPayload.append("packageName", formData.packageName);
    formPayload.append("price", formData.price);
    formPayload.append("travelDatesFrom", formData.travelDatesFrom);
    formPayload.append("travelDatesTo", formData.travelDatesTo);
    formPayload.append("packageDetails", formData.packageDetails);
    formPayload.append("image", formData.image);
    formPayload.append("itinerary", JSON.stringify(itinerary));
    formPayload.append("inclusion", formData.inclusion);
    formPayload.append("exclusion", formData.exclusion);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error);
        throw new Error(result.error || "Failed to create package");
      }

      toast.success("Package created successfully!");

      setTimeout(() => {
        router.push("/admin");
      }, 2000);

      // router.push(`/packages/${result._id}`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const backClickHandler = () => {
    router.back();
  };

  return (
    <>
      <Navbar />
      <div>
        <button onClick={backClickHandler} className="mx-4 my-2 cursor-pointer">
          <span className="text-pink-500 ">Back</span>
        </button>
      </div>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Add New Travel Package
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-lg p-6"
          >
            <div className="space-y-6">
              {/* Package Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name
                </label>
                <input
                  type="text"
                  value={formData.packageName}
                  onChange={(e) =>
                    setFormData({ ...formData, packageName: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              {/* Price & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Dates
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={formData.travelDatesFrom}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          travelDatesFrom: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="date"
                      value={formData.travelDatesTo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          travelDatesTo: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Package Details */}
              <div className="h-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Details
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.packageDetails}
                  onChange={(value) =>
                    setFormData({ ...formData, packageDetails: value })
                  }
                  className="bg-white h-80"
                />
                {/* <textarea
                  value={formData.packageDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, packageDetails: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent h-32"
                  required
                /> */}
              </div>
              {/* Inclusion Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inclusion
                </label>
                <textarea
                  value={formData.inclusion}
                  onChange={(e) =>
                    setFormData({ ...formData, inclusion: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={4}
                  placeholder="e.g. Accommodation, Breakfast, Sightseeing..."
                />
              </div>

              {/* Exclusion Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exclusion
                </label>
                <textarea
                  value={formData.exclusion}
                  onChange={(e) =>
                    setFormData({ ...formData, exclusion: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={4}
                  placeholder="e.g. Airfare, Personal Expenses..."
                />
              </div>

              {/* Image Upload */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Image
                </label>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                      required
                    />
                  </div>
                  {previewImage && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={previewImage}
                        alt="Package preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Itinerary Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Itinerary
                </label>

                {itinerary.map((day, index) => (
                  <div key={index} className="mb-4 border p-4 rounded-md">
                    <p className="font-medium mb-2 text-pink-600">
                      Day {index + 1}
                    </p>
                    <input
                      type="text"
                      placeholder="Title"
                      value={day.title}
                      onChange={(e) =>
                        handleItineraryChange(index, "title", e.target.value)
                      }
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <textarea
                      placeholder="Description"
                      value={day.description}
                      onChange={(e) =>
                        handleItineraryChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="flex items-center gap-1 cursor-pointer px-2 py-1 text-sm text-red-600 border border-red-300 rounded-full hover:bg-red-100"
                    >
                      <FiMinus className="text-base" />
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="mt-2 px-4 py-2 cursor-pointer bg-pink-500 hover:bg-pink-600 text-white rounded"
                >
                  + Add Day
                </button>
              </div>
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                  Error: {error}
                </div>
              )}
              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Package..." : "Create New Package"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AddPackagePage;
