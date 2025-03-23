import React, { useState } from "react";
import SearchBar from "../components/SearchBar"; 


const PlantDetails: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-800 flex flex-col items-center justify-center px-4">
      {/* Thanh tìm kiếm */}
      <SearchBar placeholder="Tìm kiếm cây trồng..." onSearch={setSearchValue} />

      {/* Khối thông tin */}
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mt-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Cây kim ngân</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Năng suất</span>
            <span className="text-gray-900 font-semibold">±523 gr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">THC</span>
            <span className="text-gray-900 font-semibold">14 %</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">CBD</span>
            <span className="text-gray-900 font-semibold">0,2 %</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Ra hoa</span>
            <span className="text-gray-900 font-semibold">3 - 5 Tuần</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
