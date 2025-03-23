import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

const PlantDetails: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-800 flex flex-col items-center justify-center px-4">
      {/* Thanh tìm kiếm */}
      <SearchBar placeholder="Tìm kiếm cây trồng..." onSearch={setSearchValue} />

      {/* Khối thông tin */}
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full mt-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Cây kim ngân</h1>

        {/* Ô bọc thông tin */}
        <div className="info-container">
          <div className="info-table">
            <div className="info-row">
              <div>Năng suất:</div>
              <div>±523 gr</div>
            </div>
            <div className="info-row">
              <div>THC:</div>
              <div>14%</div>
            </div>
            <div className="info-row">
              <div>CBD:</div>
              <div>0,2%</div>
            </div>
            <div className="info-row">
              <div>Ra hoa:</div>
              <div>3 - 5 Tuần</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;