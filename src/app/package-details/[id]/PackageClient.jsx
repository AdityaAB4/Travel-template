"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import moment from "moment";

export default function PackageDetailsClient({ packageData }) {
  const router = useRouter();

  const backClickHandler = () => {
    router.back();
  };

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
      </div>
      <Footer />
    </>
  );
}
