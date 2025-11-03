import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { LuPlus, LuMinus, LuTrash2, LuX } from "react-icons/lu";

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useContext(ShopContext);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Cart Box */}
      <div className="fixed top-16 right-5 sm:right-5 w-80 sm:w-96 h-[70vh] bg-white shadow-lg z-50 flex flex-col overflow-hidden rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border"
                    >
                      <LuMinus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border"
                    >
                      <LuPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-1">
                  <LuTrash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* SubTotal & Buttons */}
        <div className="p-4 border-t flex flex-col gap-3">
          <p className="font-semibold text-lg">SubTotal: Rs.{totalPrice.toFixed(2)}</p>
          <hr className="border-gray-300" />
          <div className="flex gap-2">
            <button className="flex-1 border border-gray-400 py-2 rounded-md hover:bg-gray-100">
              View Cart
            </button>
            <button className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
