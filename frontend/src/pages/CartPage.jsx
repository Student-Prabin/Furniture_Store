import { useContext, useEffect, useState } from "react";
import Title from "../components/Title.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const nav = useNavigate();
  const { products, currency, cartItems, updateQuantity, getCartAmount } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await getCartAmount();
      setCartTotal(total);
    };
    fetchTotal();
  }, [cartItems, getCartAmount]);

  return (
    <>
      <Title page={"Cart"} />
      <div className="px-3 sm:px-8 md:px-10 py-6">

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left Section */}
          <div className="flex-1 p-4 rounded-lg bg-white shadow-sm">
            {/* Header Row */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_80px] font-semibold p-4 bg-[#FFF9E5] rounded-md text-sm sm:text-base">
              <p>Products</p>
              <p className="text-center">Price</p>
              <p className="text-center">Quantity</p>
              <p className="text-right">Subtotal</p>
              <p className="text-right pr-4">Remove</p>
            </div>

            {/* Cart Items */}
            <div className="mt-4 flex flex-col gap-4">
              {cartData.length === 0 ? (
                <p className="text-gray-500 text-center mt-10 text-sm sm:text-base">
                  Your cart is empty.
                </p>
              ) : (
                cartData.map((item, index) => {
                  const productData = products.find(
                    (product) => product._id === item._id
                  );
                  if (!productData) return null;

                  return (
                    <div
                      onClick={() => nav(`/product/${productData._id}`)}
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_80px] gap-3 sm:gap-0 items-center border-b border-gray-200 pb-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={productData.image[0]}
                          alt={productData.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="max-w-[220px] text-gray-500">
                          <p className="font-medium truncate">
                            {productData.name}
                          </p>
                          <p className="text-sm">Size: {item.size}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <p className="text-center text-gray-500 sm:text-base text-sm">
                        {currency}
                        {productData.price.toFixed(2)}
                      </p>

                      {/* Quantity */}
                      <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item._id,
                              item.size,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-14 text-center border border-gray-400 rounded-md bg-white py-1 text-sm sm:text-base"
                        />
                      </div>

                      {/* Subtotal */}
                      <p className="text-right font-semibold text-sm sm:text-base">
                        {currency}
                        {(productData.price * item.quantity).toFixed(2)}
                      </p>

                      {/* Delete */}
                      <div
                        className="flex justify-end pr-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.size, item.quantity - 1)
                          }
                          className="text-[#d1bf82] hover:text-[#ad9e6c] transition cursor-pointer"
                        >
                          <LuTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3 bg-[#FFF9E5] p-6 rounded-lg flex flex-col gap-4 h-fit sticky top-20">
            <h2 className="text-center font-bold text-lg pb-2">
              Cart Totals
            </h2>

            {/* Subtotal List */}
            <div className="flex flex-col gap-1  font-medium">
              <p>Subtotal:</p>
              <div className="flex flex-col items-end text-gray-700">
                {cartData.map((cartItem, index) => {
                  const product = products.find((p) => p._id === cartItem._id);
                  if (!product) return null;
                  return (
                    <p key={index}>
                      {currency}
                      {(product.price * cartItem.quantity).toFixed(2)}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between border-t font-medium pt-2 border-gray-300">
              <p>Total:</p>
              <p className="text-[#B88E2F]">
                {currency}
                {cartTotal.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => nav('/checkout')}
              className="mt-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition cursor-pointer text-sm sm:text-base">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
