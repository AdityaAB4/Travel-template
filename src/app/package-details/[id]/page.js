// app/packages/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function PackageDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
      const data = await res.json();
      setPackageData(data);
    };

    if (id) fetchPackage();
  }, [id]);

  const backClickHandler = () => {
    router.back();
  };

  if (!packageData) return <p>Loading...</p>;

  const formattedFrom = moment(packageData.travelDates?.from).format(
    "MMMM D, YYYY"
  );
  const formattedTo = moment(packageData.travelDates?.to).format(
    "MMMM D, YYYY"
  );

  return (
    <>
      <Navbar />
      <div>
        <button onClick={backClickHandler} className="mx-4 my-2 cursor-pointer">
          <span className="text-pink-500 ">Back</span>
        </button>
      </div>
      <div className="max-w-2xl mx-auto p-6 shadow-xl rounded-md bg-white">
        <img
          src={packageData.imageUrl}
          alt={packageData.packageName}
          className="w-full rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4 text-pink-600">
          {packageData.packageName}
        </h1>
        <p className="text-lg font-medium mt-2">Price: ${packageData.price}</p>
        <p className="mt-1 text-sm text-gray-500">
          Travel Dates: {formattedFrom} - {formattedTo}
        </p>
        <div
          className="prose max-w-none [&_ol]:list-disc [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: packageData.packageDetails }}
        />
        {/* <p className="mt-4 text-gray-700">{packageData.packageDetails}</p> */}
      </div>
      <Footer />
    </>
  );
}
