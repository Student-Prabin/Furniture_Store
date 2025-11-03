import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { LuSearch, LuX } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("shop")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-25">
      {/* Search Box */}
      <div className="relative bg-white rounded-full w-3/4 sm:w-1/2 flex items-center px-5 py-2 shadow-lg">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <LuSearch className="mr-2" />
        <LuX
          className="cursor-pointer"
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
