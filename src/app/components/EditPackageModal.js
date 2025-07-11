import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const EditPackageModal = ({ packageData, onClose, onUpdate }) => {
  console.log(packageData, "data");

  const [formData, setFormData] = useState({
    packageName: packageData.packageName,
    price: packageData.price,
    travelDatesFrom: new Date(packageData.travelDates.from)
      .toISOString()
      .split("T")[0],
    travelDatesTo: new Date(packageData.travelDates.to)
      .toISOString()
      .split("T")[0],
    packageDetails: packageData.packageDetails,
    days: packageData.days || "",
    nights: packageData.nights || "",
    cities: packageData.cities || "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [itinerary, setItinerary] = useState(packageData.itinerary || []);

  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, { title: "", description: "" }]);
  };

  const removeItineraryDay = (index) => {
    const updated = itinerary.filter((_, i) => i !== index);
    setItinerary(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("packageName", formData.packageName);
    formPayload.append("price", formData.price);
    formPayload.append("travelDatesFrom", formData.travelDatesFrom);
    formPayload.append("travelDatesTo", formData.travelDatesTo);
    formPayload.append("packageDetails", formData.packageDetails);
    formPayload.append("itinerary", JSON.stringify(itinerary));
    formPayload.append("days", formData.days);
    formPayload.append("nights", formData.nights);
    formPayload.append("cities", formData.cities);
    if (formData.image) formPayload.append("image", formData.image);

    try {
      const response = await fetch(
        // `http://localhost:5000/api/packages/${packageData._id}`,
        `${process.env.NEXT_PUBLIC_API_URL}/${packageData._id}`,
        {
          method: "PUT",
          body: formPayload,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Update failed");
      }

      const updatedPackage = await response.json();
      onUpdate(updatedPackage);
      onClose();
    } catch (error) {
      alert(`Update failed: ${error.message}`);
    }
  };

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

  return (
    <div className=" inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Travel Package
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
          >
            <FiX className="h-7 w-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={formData.travelDatesFrom}
                onChange={(e) =>
                  setFormData({ ...formData, travelDatesFrom: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={formData.travelDatesTo}
                onChange={(e) =>
                  setFormData({ ...formData, travelDatesTo: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Days
              </label>
              <input
                type="number"
                value={formData.days}
                onChange={(e) =>
                  setFormData({ ...formData, days: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nights
              </label>
              <input
                type="number"
                value={formData.nights}
                onChange={(e) =>
                  setFormData({ ...formData, nights: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Cities Covered{" "}
                <span className="text-gray-500 text-xs">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={formData.cities}
                onChange={(e) =>
                  setFormData({ ...formData, cities: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="e.g. Manali, Shimla, Kullu"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Package Details
            </label>
            <ReactQuill
              theme="snow"
              value={formData.packageDetails}
              onChange={(value) =>
                setFormData({ ...formData, packageDetails: value })
              }
              className="bg-white"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Update Package Image
              <span className="text-gray-500 ml-2">(optional)</span>
            </label>
            <div className="flex items-center gap-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
              />
              {(previewImage || packageData.imageUrl) && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={previewImage || packageData.imageUrl}
                    alt="Package preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

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
                    handleItineraryChange(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  rows={3}
                />
                <button
                  type="button"
                  onClick={() => removeItineraryDay(index)}
                  className="mt-2 text-sm cursor-pointer text-red-600 border border-red-300 rounded-full px-3 py-1 hover:bg-red-100 flex items-center gap-1"
                >
                  <FiTrash2 className="text-base" /> Remove
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

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 cursor-pointer  text-gray-600 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 cursor-pointer bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackageModal;
