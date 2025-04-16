"use client";

import React from "react";

const VerTiendaButton: React.FC = () => {
  return (
    <button
      onClick={() => window.location.assign("/tienda")}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
    >
      Ver Tienda
    </button>
  );
};

export default VerTiendaButton;
