import React, { useState, useEffect, useRef } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up a new timeout
    timeoutRef.current = setTimeout(() => {
      // Your API call or other logic here
    }, 500);

    // Cleanup the timeout when the component unmounts or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]); // Include only searchTerm in the dependency array

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;
