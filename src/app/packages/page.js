import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";

const page = () => {
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
  return (
    <main>
      <Navbar />
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Hot Deals 🔥</h2>
            <a href="#" className="text-pink-600 hover:underline">
              View All Offers
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOT_DEALS.map((item, i) => (
              <div
                key={i}
                className="border border-pink-400 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={item.url}
                  width={400}
                  height={300}
                  alt="Special Offer"
                />
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-pink-600 font-bold">30% OFF</span>
                    <span className="text-gray-500">5 days left</span>
                  </div>
                  <h3 className="font-bold mb-2">Luxury Bali Retreat</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">$1599</span>
                    <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default page;
