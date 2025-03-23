import React from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  return (
    <div className="flex justify-center w-full mt-6">
      <input
        type="text"
        placeholder={placeholder || "Tìm kiếm cây trồng..."}
        className="border-2 border-gray-300 focus:border-green-500 focus:outline-none shadow-md text-2xl"
        style={{
          width: "330px",
          height: "22px",
          borderRadius: "8px",
          paddingTop: "14px",
          paddingRight: "16px",
          paddingBottom: "14px",
          paddingLeft: "16px",
        }}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
