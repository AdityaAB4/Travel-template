"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import InquiryForm from "@/app/components/InquiryForm";

import moment from "moment";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiXCircle,
} from "react-icons/fi";

const ItineraryDay = ({ dayNumber, title, description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-l-4 border-pink-500 bg-pink-50 p-4 rounded-md shadow-sm">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="text-lg font-bold text-pink-700">
          Day {dayNumber}: {title}
        </h3>
        {expanded ? (
          <FaChevronUp className="text-pink-600" />
        ) : (
          <FaChevronDown className="text-pink-600" />
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? "max-h-96 mt-2" : "max-h-0"
        }`}
      >
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default function PackageDetailsClient({ packageData }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inclusion");

  const backClickHandler = () => {
    router.back();
  };

  const formattedFrom = moment(packageData.travelDates?.from).format(
    "MMMM D, YYYY"
  );
  const formattedTo = moment(packageData.travelDates?.to).format(
    "MMMM D, YYYY"
  );

  const totalDuration = `${packageData.days || 0} Days / ${
    packageData.nights || 0
  } Nights`;
  const cities = packageData?.cities
    ? packageData?.cities?.map((city) => city.trim())
    : [];

  const inclusionList = packageData.inclusion
    ? packageData.inclusion.split(/\r?\n/).filter(Boolean)
    : [];

  const exclusionList = packageData.exclusion
    ? packageData.exclusion.split(/\r?\n/).filter(Boolean)
    : [];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={backClickHandler}
          className="flex items-center gap-2 cursor-pointer mb-6 text-pink-600 hover:text-pink-800 text-sm"
        >
          <FiArrowLeft className="text-lg" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Package Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={packageData.imageUrl}
                alt={packageData.packageName}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h1 className="text-4xl font-bold text-pink-600 mb-2">
                  {packageData.packageName}
                </h1>

                <div className="text-gray-700 mb-6 space-y-1">
                  <p className="text-lg font-medium">
                    Price: ₹{packageData.price} / per person
                  </p>
                  <p className="text-sm text-gray-500">
                    Travel Dates: {formattedFrom} - {formattedTo}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mt-2">
                    {/* Duration with Clock Icon */}
                    <div className="flex items-center gap-2 text-sm text-pink-600 font-semibold">
                      <FiClock className="text-pink-500 text-base" />
                      {totalDuration}
                    </div>

                    {/* Cities with Map Icon */}
                    {cities.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FiMapPin className="text-pink-500 text-base" />
                        <div className="flex flex-wrap gap-2">
                          {cities.map((city, idx) => (
                            <span
                              key={idx}
                              className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full border border-pink-300"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                    Package Details
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: packageData.packageDetails,
                    }}
                  />
                </div>

                {/* Inclusion and Exclusion Tabs */}
                {(packageData.inclusion?.length > 0 ||
                  packageData.exclusion?.length > 0) && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Inclusions & Exclusions
                    </h2>

                    <div className="flex mb-4 rounded-lg overflow-hidden border border-pink-200">
                      <button
                        className={`w-1/2 px-4 py-2 font-medium transition-colors border-gray-100 ${
                          activeTab === "inclusion"
                            ? "bg-pink-600 text-white"
                            : "bg-gray-50 text-gray-800"
                        }`}
                        onClick={() => setActiveTab("inclusion")}
                      >
                        Inclusion
                      </button>
                      <button
                        className={`w-1/2 px-4 py-2 font-medium transition-colors ${
                          activeTab === "exclusion"
                            ? "bg-pink-600 text-white"
                            : "bg-gray-50 text-gray-800"
                        }`}
                        onClick={() => setActiveTab("exclusion")}
                      >
                        Exclusion
                      </button>
                    </div>

                    {activeTab === "inclusion" && (
                      <ul className="space-y-2">
                        {inclusionList.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <FiCheckCircle className="text-green-600 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === "exclusion" && (
                      <ul className="space-y-2">
                        {exclusionList.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <FiXCircle className="text-red-500 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Itinerary Section */}
                {packageData.itinerary && packageData.itinerary.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Itinerary
                    </h2>
                    <div className="space-y-4">
                      {packageData.itinerary.map((day, index) => (
                        <ItineraryDay
                          key={index}
                          dayNumber={index + 1}
                          title={day.title}
                          description={day.description}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="lg:w-1/3 bg-white shadow-md p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-pink-600 mb-4">
              Send Inquiry
            </h2>
            <InquiryForm packageData={packageData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
