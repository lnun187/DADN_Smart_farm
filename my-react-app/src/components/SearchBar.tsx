import React from "react";


interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Tìm kiếm...", onSearch }) => {
  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none shadow-md transition-all"
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
