import { FiX } from "react-icons/fi";

const ShareModal = ({ onClose, packageUrl }) => {
  const shareText = encodeURIComponent(
    "Check out this amazing travel package!"
  );
  const encodedUrl = encodeURIComponent(packageUrl);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <FiX size={20} />
        </button>
        <h3 className="text-lg font-semibold mb-4">Share this package</h3>
        <div className="flex flex-col gap-4">
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-center"
          >
            Share on WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Share on LinkedIn
          </a>
          <a
            href={`mailto:?subject=Travel Package&body=${shareText}%20${packageUrl}`}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-center"
          >
            Share via Email
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(packageUrl);
              alert("Link copied to clipboard!");
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
