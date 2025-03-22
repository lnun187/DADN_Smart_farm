import React from "react";

const GradientCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[500px] h-[300px] rounded-2xl bg-gradient-to-b from-green-400 to-black shadow-lg"></div>
    </div>
  );
};

export default GradientCard;
