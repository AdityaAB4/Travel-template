import { headers } from "next/headers";
import PackageClient from "./PackageClient";

export async function generateMetadata({ params }) {
  // Destructure id from params synchronously
  const { id } = params;
  const headersList = headers();
  const host = headersList.get("host") || "";
  const tenant = host.split(".")[0];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
    method: "GET",
    headers: {
      "X-Frontend-Domain": tenant,
    },
  });

  const packageData = await res.json();

  return {
    title: `${packageData.packageName} | Travel Packages`,
    description: `Explore ${packageData.packageName} from just $${packageData.price}. Book now!`,
    openGraph: {
      title: `${packageData.packageName} | Travel Packages`,
      description: `Explore ${packageData.packageName} from just $${packageData.price}. Book now!`,
      images: [
        {
          url: packageData.imageUrl,
          width: 1200,
          height: 630,
          alt: packageData.packageName,
        },
      ],
    },
  };
}

export default async function PackagePage({ params }) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const tenant = host.split(".")[0];
  // const tenant = "localhost";
  console.log("tenant", tenant);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.id}`, {
    method: "GET",
    headers: {
      "X-Frontend-Domain": tenant,
    },
    cache: "no-store",
  });
  const packageData = await res.json();
  console.log(
    packageData,
    "PackageData---------------------------------///////////////"
  );

  return <PackageClient packageData={packageData} />;
}
