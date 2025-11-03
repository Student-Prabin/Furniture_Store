import { LuAlignVerticalSpaceAround, LuLayoutGrid, LuSlidersHorizontal } from "react-icons/lu";
import Title from "../components/Title.jsx";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../components/ProductItem.jsx";
import { ShopContext } from "../context/ShopContext.jsx";

const Shop = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Toggle category selection
  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory(category.filter((c) => c !== val));
    } else {
      setCategory([...category, val]);
    }
  };

  // Apply filter & sort
  useEffect(() => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((p) => category.includes(p.category));
    }

    if (sort === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(productsCopy);
    setPage(1);
  }, [category, sort, search, showSearch]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <Title page={"Shop"} />

      {/* Tab */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6 bg-gray-100 rounded-md shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className={`flex gap-1 items-center hover:cursor-pointer py-2 px-2 ${open ? "bg-gray-300" : "hover:bg-gray-200"}`}
          >
            <LuSlidersHorizontal />
            <span className="text-gray-600 font-semibold">Filter:</span>
          </button>

          <div className="flex gap-2">
            {/* Grid view button */}
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded transition ${view === "grid" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            >
              <LuLayoutGrid className="w-5 h-5" />
            </button>

            {/* Column view button */}
            <button
              onClick={() => setView("column")}
              className={`p-2 rounded transition ${view === "column" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            >
              <LuAlignVerticalSpaceAround className="w-5 h-5" />
            </button>
          </div>

          <span className="text-gray-700 text-sm ml-4">
            Showing {(page - 1) * itemsPerPage + 1} -{" "}
            {Math.min(page * itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} results
          </span>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <span>Show:</span>
            <input
              type="number"
              min={1}
              max={filteredProducts.length}
              value={itemsPerPage}
              onChange={(e) => {
                const val = Number(e.target.value);
                setItemsPerPage(val < 1 ? 1 : val);
                setPage(1);
              }}
              className="w-12 text-center border border-gray-300 rounded bg-white py-1"
            />
          </div>

          {/* Sort by */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-semibold">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-300 rounded py-1 px-2 text-sm"
            >
              <option value="default">Default</option>
              <option value="low-high">Low - High</option>
              <option value="high-low">High - Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      {open && (
        <div className="w-full border pl-5 py-3 mt-6 rounded-md shadow-sm">
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
                className="w-3 h-3"
              />{" "}
              Men
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
                className="w-3 h-3"
              />{" "}
              Women
            </label>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="flex-1 p-5">
        <div
          className={`grid gap-4 gap-y-6 ${view === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
        >
          {paginatedProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              view={view}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center my-6 gap-2">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded bg-[#FFF9E5] hover:bg-[#FBEBB5] transition-colors"
          >
            Prev
          </button>
        )}

        {(() => {
          const maxButtons = 5;
          let start = Math.max(1, page - 2);
          let end = start + maxButtons - 1;

          if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxButtons + 1);
          }

          const buttons = [];

          if (start > 1) {
            buttons.push(
              <button
                key={1}
                onClick={() => setPage(1)}
                className={`px-3 py-1 rounded transition-colors ${page === 1 ? "bg-[#FBEBB5] font-semibold" : "bg-[#FFF9E5] hover:bg-[#FBEBB5]"
                  }`}
              >
                1
              </button>
            );
            if (start > 2) buttons.push(<span key="start-ellipsis">…</span>);
          }

          for (let i = start; i <= end; i++) {
            buttons.push(
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-3 py-1 rounded transition-colors ${page === i ? "bg-[#FBEBB5] font-semibold" : "bg-[#FFF9E5] hover:bg-[#FBEBB5]"
                  }`}
              >
                {i}
              </button>
            );
          }

          if (end < totalPages) {
            if (end < totalPages - 1) buttons.push(<span key="end-ellipsis">…</span>);
            buttons.push(
              <button
                key={totalPages}
                onClick={() => setPage(totalPages)}
                className={`px-3 py-1 rounded transition-colors ${page === totalPages ? "bg-[#FBEBB5] font-semibold" : "bg-[#FFF9E5] hover:bg-[#FBEBB5]"
                  }`}
              >
                {totalPages}
              </button>
            );
          }

          return buttons;
        })()}

        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded bg-[#FFF9E5] hover:bg-[#FBEBB5] transition-colors"
          >
            Next
          </button>
        )}
      </div>

    </div>
  );
};

export default Shop;
