import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="font-sans">
        {/* Hero Section */}
        <section
          className="relative h-80 bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: "url('/about-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-pink-500 bg-opacity-50"></div>
          <div className="text-center relative z-10 px-4">
            <h1 className="text-4xl font-bold">About Us</h1>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 bg-white text-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-800 text-lg">
              TravelExplorer is your go-to travel partner, dedicated to helping
              you explore breathtaking destinations around the world. Our
              mission is to provide seamless travel experiences, expert guides,
              and 24/7 support to ensure your journey is unforgettable.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-gray-100 text-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-800 text-lg">
              We strive to make travel easy, enjoyable, and accessible for
              everyone. Our carefully curated travel packages, expert
              recommendations, and top-notch customer service set us apart as a
              leader in the travel industry.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
