import PackageClient from "./PackageClient";

export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.id}`);
  const packageData = await res.json();
  console.log("packageData", packageData);

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.id}`);
  const packageData = await res.json();
  console.log(
    packageData,
    "PackageData---------------------------------///////////////"
  );

  return <PackageClient packageData={packageData} />;
}
