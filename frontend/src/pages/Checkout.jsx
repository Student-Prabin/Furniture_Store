import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { products, cartItems, currency } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const nav = useNavigate();

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

  const getSubtotal = () => {
    let total = 0;
    cartData.forEach((item) => {
      const productData = products.find((p) => p._id === item._id);
      if (productData) total += productData.price * item.quantity;
    });
    return total;
  };

  const subtotal = getSubtotal();
  const total = subtotal; // can add delivery later if needed

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-6 sm:px-12 py-10">
      {/* Left Section - Billing Details */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center lg:text-left">
          Billing Details
        </h2>

        <form className="flex flex-col gap-4">
          {/* First Name & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col w-full sm:w-[48%]">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-3 w-full sm:w-[90%] focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div className="flex flex-col w-full sm:w-[48%]">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-3 w-full sm:w-[90%] focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">
              Company Name <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Country/Region */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">Country / Region</label>
            <select className="border border-gray-300 rounded-md px-3 py-3 bg-white w-full focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option value="">Select Country</option>
              <option value="Nepal">Nepal</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="United States">United States</option>
            </select>
          </div>

          {/* Street Address */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              placeholder="House number and street name"
              className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Town / City */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">Town / City</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Province */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">Province</label>
            <select className="border border-gray-300 rounded-md px-3 py-3 bg-white w-full focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option value="">Select Province</option>
              <option>Province No. 1</option>
              <option>Madhesh Province</option>
              <option>Bagmati Province</option>
              <option>Gandaki Province</option>
              <option>Lumbini Province</option>
              <option>Karnali Province</option>
              <option>Sudurpashchim Province</option>
            </select>
          </div>

          {/* ZIP Code */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Additional Info */}
          <div className="flex flex-col w-full sm:w-[90%]">
            <label className="text-sm font-medium text-gray-700">
              Additional Information
            </label>
            <textarea
              rows="3"
              placeholder="Notes about your order, e.g. special delivery instructions."
              className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            ></textarea>
          </div>
        </form>
      </div>

      {/* Right Section - Compact Order Summary */}
      <div className="w-full lg:w-[35%] p-4 ">
        {/* Header */}
        <div className="flex justify-between font-semibold text-gray-800 border-b border-gray-300 pb-2">
          <p>Product</p>
          <p>Subtotal</p>
        </div>

        {/* Product List */}
        <div className="mt-3 flex flex-col gap-3 border-b border-gray-300 pb-4">
          {cartData.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No products in your cart.</p>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((p) => p._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="flex justify-between text-gray-600 text-sm"
                >
                  <p>
                    {productData.name} × {item.quantity}
                  </p>
                  <p className="font-medium">
                    {currency}
                    {(productData.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Subtotal and Total */}
        <div className="mt-4 flex flex-col gap-2 text-sm border-b border-gray-300 pb-4">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency}
              {subtotal.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-base">
            <p>Total</p>
            <p>
              {currency}
              {total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-5 flex flex-col gap-3 text-gray-700">
          <label className="flex items-start gap-2">
            <input type="radio" name="payment" className="accent-black mt-1" defaultChecked />
            <div>
              <p>Direct Bank Transfer</p>
              <p className="text-gray-400 text-sm mt-1">
                Make your payment directly into our bank account. Please use your
                Order ID as the payment reference. Your order will not be shipped
                until the funds have cleared in our account.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-2">
            <input type="radio" name="payment" className="accent-black mt-1" defaultChecked />
            <div>
              <p>Cash On Delivery</p>
              <p className="text-gray-400 text-sm mt-1">
                Make your payment directly into our bank account. Please use your
                Order ID as the payment reference. Your order will not be shipped
                until the funds have cleared in our account.
              </p>
            </div>
          </label>


          <p className="text-md">
            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
          </p>

          <button className="mx-auto mt-4 w-1/2 border border-black text-black font-semibold py-2 rounded-md hover:bg-black hover:text-white transition cursor-pointer" onClick={() => nav('/my-orders')}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
