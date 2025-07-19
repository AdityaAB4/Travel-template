"use client";
import { useEffect, useState } from "react";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  const TRENDING_IMAGES = [
    {
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&h=800&q=80",
      title: "Bali Luxury Villas",
      price: "$1599",
    },
    {
      url: "https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&w=1200&h=800&q=80",
      title: "Swiss Alpine Retreat",
      price: "$2999",
    },
    {
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&h=800&q=80",
      title: "Kyoto Cultural Journey",
      price: "$1899",
      alt: "Fushimi Inari Shrine in Kyoto with traditional torii gates",
    },
  ];

  // HotDeals.jsx
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

  const handleShowClick = (_id) => {
    router.push(`/package-details/${_id}`);
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  return (
    <main>
      <Navbar />
      <main>
        <Carousel />
        {/* Offers */}
        {packages?.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Latest Packages</h2>
              </div>

              {loading ? (
                <div className="flex justify-center items-center my-8">
                  <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.length > 0 &&
                    packages?.slice(0, 3).map((pkg) => (
                      <div
                        key={pkg._id}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <Image
                          src={pkg.imageUrl}
                          width={400}
                          height={300}
                          alt={pkg.packageName}
                          className="w-full h-60 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1">
                            {pkg.packageName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            ₹{pkg.price.toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleShowClick(pkg._id)}
                            className="cursor-pointer px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        )}
        <section
          className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-pink-400 bg-opacity-50"></div>
          <div className="text-center relative z-10 px-4">
            <h1 className="text-5xl font-bold mb-4">
              Explore the World with Us
            </h1>
            <p className="text-lg mb-6">
              Find the best travel destinations and make unforgettable memories.
            </p>
            <button className="cursor-pointer bg-pink-500 px-6 py-3 rounded-full text-white text-lg shadow-lg hover:bg-pink-600">
              Get Started
            </button>
          </div>
        </section>

        {/* Popular Destinations */}
        {/* <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Popular Destinations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {["Bali", "Paris", "Santorini"].map((destination, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={`/${destination.toLowerCase()}.jpg`}
                    alt={destination}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{destination}</h3>
                    <p className="text-gray-600 mt-2">
                      A beautiful place to visit.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        {/* Trending destinations */}
        <section className="py-16 bg-gray-50 text-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Trending Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TRENDING_IMAGES.map((destination) => (
                <div
                  key={destination.url}
                  className="relative group overflow-hidden rounded-2xl"
                >
                  <Image
                    src={destination.url}
                    width={600}
                    height={400}
                    alt={destination}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {destination.title}
                    </h3>
                    <div className="flex justify-between text-white">
                      <span>From $999</span>
                      <button className="cursor-pointer px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white text-gray-800">
          <div className="max-w-6xl mx-4 sm:mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {["Best Prices", "Expert Guides", "24/7 Support"].map(
                (feature, index) => (
                  <div
                    key={index}
                    className="p-6 bg-pink-200 rounded-lg shadow"
                  >
                    <h3 className="text-xl font-semibold">{feature}</h3>
                    <p className="text-gray-800 mt-2">
                      We ensure the best experience for our customers.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16  text-gray-800">
          <div className="max-w-6xl  mx-4 sm:mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {["John Doe", "Jane Smith"].map((customer, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 shadow-lg rounded-lg"
                >
                  <p className="text-gray-600 italic">
                    “Amazing experience! Will definitely book again.”
                  </p>
                  <h3 className="text-lg font-semibold mt-4">- {customer}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </main>
  );
}
