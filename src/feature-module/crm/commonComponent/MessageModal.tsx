import React, { useEffect } from "react";

interface MessageModalProps {
  show: boolean;
  onClose: () => void;
  type: "success" | "error";
  message: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  show,
  onClose,
  type,
  message,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [show]);

  if (!show) return null;

  const bgColor = type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  const borderColor = type === "success" ? "border-green-300" : "border-red-300";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose} // close on backdrop click
    >
      <div
        className={`w-80 p-6 rounded-lg shadow-lg bg-white border ${borderColor} relative`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        <h2
          id="modal-title"
          className={`text-lg font-semibold mb-4 ${bgColor} px-3 py-2 rounded`}
        >
          {type === "success" ? "Success" : "Error"}
        </h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
