import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-10 w-full text-sm  lg:px-32 py-6 border  bg-slate-800 text-white items-center space-y-3 sm:space-y-0">
      <div className="flex flex-col items-center md:flex-row justify-around">
        <div>
          <div className="flex flex-row items-center">
            {/* <img
              src="/favicon-96x96.png"
              width="20"
              height="20"
              className="inline-block mr-1"
              alt="pixel-to-inches-converter-image"
            /> */}
            <Link href="/"> Travel and Enjoy</Link>
          </div>
          <div className="mt-1 flex justify-center sm:justify-start">
            <p className="text-xs">&copy; 2025</p>
          </div>
        </div>

        <ul>
          <li className="hover:text-pink-500 my-1 text-center md:text-left">
            <Link href="/about">Packages</Link>
          </li>
          {/* <li className="hover:text-pink-500 my-1 text-center md:text-left">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hover:text-pink-500 my-1 text-center md:text-left">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="hover:text-pink-500 my-1 text-center md:text-left">
            <Link href="https://www.youtube.com/@pixeltoinches">Youtube</Link>
          </li>
          <li className="hover:text-pink-500 my-1 text-center md:text-left">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li> */}
        </ul>

        <ul>
          <li className="hover:text-pink-500 my-1 text-center md:text-left">
            <Link href="/pixel-to-cm">About us</Link>
          </li>
        </ul>
        <ul className="">
          <li className="hover:text-pink-600 my-1 text-center md:text-left">
            <Link href="/pixel-to-mm">Contact Us</Link>
          </li>

          {/* <li className="hover:text-gray-600 my-1 text-center md:text-left">
            <Link href="/random-4-letter-generator">
              Random 4 Letter Generator
            </Link>
          </li>
          <li className="hover:text-gray-600 my-1 text-center md:text-left">
            <Link href="/random-5-letter-generator">
              Random 5 Letter Generator
            </Link>
          </li> */}
        </ul>

        {/* <ul className="">
          <li className="hover:text-gray-600 my-1 text-center md:text-left">
            <Link href="/random-lowercase-letter-generator">
              Random Lowercase Letter Generator
            </Link>
          </li>
          <li className="hover:text-gray-600 my-1 text-center md:text-left">
            <Link href="/random-uppercase-letter-generator">
              Random Uppercase Letter Generator
            </Link>
          </li>
          <li className="hover:text-gray-600 my-1 text-center md:text-left">
            <Link href="/random-greek-letter-generator">
              Random Greek Letter Generator
            </Link>
          </li>
          <li className="hover:text-gray-600 my-1 text-center md:text-left">
            <Link href="/random-month-generator">Random Month Generator</Link>
          </li>
        </ul> */}
      </div>
    </footer>
  );
}
