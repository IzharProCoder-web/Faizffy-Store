import React, { useState } from "react";

const FirstOrderPopup = ({ onClose }) => {
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.trim()) {
      // ----> Put your API call / localStorage logic here <----
      // Example:
      // localStorage.setItem("firstOrderDiscountClaimed", "true");
      // toast.success("7% discount applied!");
      onClose();               // close the popup
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      {/* Backdrop click → close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close × */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          CONGRATULATIONS
        </h2>

        <p className="mb-4 text-center text-5xl font-bold text-black">
          FLAT <span className="text-6xl">7</span>% OFF
        </p>

        <p className="mb-6 text-center text-xl font-medium text-gray-700">
          ON YOUR FIRST ORDER
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mobile *
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="923000000000"
              className="mt-1 w-full rounded-full border border-gray-300 px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-black py-3 font-semibold text-white transition hover:bg-white"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          *Offer valid only on first purchase
        </p>
      </div>
    </div>
  );
};

export default FirstOrderPopup;