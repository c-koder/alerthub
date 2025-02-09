import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const Alert = ({ title, data, error, success }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={`relative rounded border-s-4 ${
        error ? "border-red-600" : success && "border-emerald-600"
      } border-opacity-80 ${
        error ? "bg-red-50" : success && "bg-emerald-50"
      } p-4`}
    >
      <div
        className={`flex items-center gap-2 border-b pb-2 ${
          error
            ? "border-red-800/10 text-red-800"
            : success && "border-emerald-800/10 text-emerald-800"
        }`}
      >
        <ExclamationTriangleIcon width={20} className="mt-0.5" />
        <strong className="block font-medium">{title}</strong>
      </div>
      <p
        className={`mt-2 text-sm text-justify ${
          error ? "text-red-700" : success && "text-emerald-700"
        }`}
      >
        {data}
      </p>

      <button
        onClick={() => setVisible(false)}
        className={`absolute top-3 right-3 ${
          error ? "text-red-700" : success && "text-emerald-700"
        } ${
          error ? "text-red-900" : success && "text-emerald-900"
        } transition cursor-pointer`}
      >
        <XCircleIcon width={20} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default Alert;
