"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setButtonLoading(true);
    // const response = await fetch("/api/send-email", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // const result = await response.json();
    // if (result.success) {
    //   console.log("Email sent successfully!");
    //   setButtonLoading(false);
    //   setFormData({
    //     name: "",
    //     email: "",
    //     message: "",
    //   });
    //   toast.success("Message sent successfully!");
    // } else {
    //   console.error("Error sending email:", result.error);
    //   setButtonLoading(false);
    //   toast.error("Failed to submit form. Please try again.");
    // }
  };
  return (
    <>
      <Navbar />
      <Head>
        <title>Contact | Pixel to Inches Converter</title>
        <meta
          name="description"
          content="Convert pixels to inches effortlessly with our precise online tool. Simply input pixel dimensions and PPI to get accurate inch measurements. Ideal for graphic designers, developers, and print professionals."
        />
      </Head>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-slate-500">
              Contact Us
            </h1>
            <h2 className="text-center text-xl text-gray-700">
              Travel and Enjoy
            </h2>
            <p className="mt-4 lg:w-2/3 mx-auto leading-relaxed text-lg">
              Have questions or need assistance planning your next adventure?
              We're here to help! Whether you're looking for travel
              recommendations, booking assistance, or general inquiries, feel
              free to reach out. Our team is dedicated to ensuring you have the
              best travel experience possible. Contact us via email, phone, or
              by filling out the form below, and we'll get back to you as soon
              as possible!
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto text-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="name" className="leading-7 text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlFor="email" className="leading-7  text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="leading-7 text-gray-600 "
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <motion.button
                    type="submit"
                    className=" flex mx-auto bg-pink-500 text-white py-2 px-4 rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={buttonLoading}
                  >
                    {!buttonLoading && <span>Submit</span>}
                    {buttonLoading && <span>Submitting your response...</span>}
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
}
