"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const InquiryForm = ({ packageData }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travellers: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inquiryData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      travellers: formData.travellers,
      message: formData.message,
      packageId: packageData._id, // make sure this is passed via props or context
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inquiryData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to send inquiry");
        return;
      }

      toast.success(result.message || "Inquiry sent successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        travellers: "",
        message: "",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Inquiry Error:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="fullName"
        type="text"
        required
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2 rounded-lg"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2 rounded-lg"
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2 rounded-lg"
      />
      <input
        name="travellers"
        type="number"
        min="1"
        required
        placeholder="No. of Travellers"
        value={formData.travellers}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2 rounded-lg"
      />
      <textarea
        name="message"
        rows="3"
        placeholder="Your message"
        value={formData.message}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2 rounded-lg"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
      >
        Submit Inquiry
      </button>
    </form>
  );
};

export default InquiryForm;
