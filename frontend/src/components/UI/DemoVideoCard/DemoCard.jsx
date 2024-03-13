// Card.js
import React from "react";

const DemoCard = ({ title, thumbnail, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={thumbnail} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  );
};

export default DemoCard;
