import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext.jsx";
import { LuFacebook, LuLinkedin, LuStar, LuTwitter } from "react-icons/lu";
import RelatedProducts from "../components/RelatedProducts.jsx";

const Product = () => {
  const { id } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const [activeTab, setActiveTab] = useState("Description");

  const tabs = ["Description", "Additional Information", "Reviews"];

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [id, products])
  return productData ? (
    < div className="pt-10 transition-opacity ease-in duration-500 opacity-100 p-10">
      <div className="h-10 mb-6 flex items-center text-md gap-1 px-4">
        <span className="text-gray-400"><Link to={'/'}>Home</Link></span>
        <span className="text-black">{'>'}</span>
        <span className="text-gray-400"><Link to={'/shop'}>Shop</Link></span>
        <span className="text-black">{'|'}</span>
        <span className="text-black">{productData.name}</span>
      </div>
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer rounded-2xl bg-[#FFF9E5]" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto rounded-2xl bg-[#FFF9E5]" />
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium text-gray-400">{currency}{productData.price}</p>
          <div className=" flex items-center gap-1 mt-2">
            <LuStar fill="orange" />
            <LuStar fill="orange" />
            <LuStar fill="orange" />
            <LuStar fill="orange" />
            <LuStar />
            <p className="pl-2 text-gray-400">| 5 Costumer Review</p>
          </div>
          <p className="mt-5 w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-gray-400 text-xl">Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`px-4 py-2 rounded-2xl ${item === size ? 'bg-[#FBEBB5]' : 'bg-[#FAF4F4]'} cursor-pointer`} key={index} >{item}</button>
                ))
              }
            </div>
            <p className="text-gray-400 text-xl">Color</p>
            <div className="flex gap-2">
              {
                // REMINDER-------------ADD COLOR HERE after dbconnection
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`w-10 h-10 rounded-full bg-red-500 cursor-pointer`} key={index} ></button>
                ))
              }
            </div>
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-lg overflow-hidden bg-white py-2 border-gray-400">
                <button
                  onClick={decrease}
                  className="px-3 py-1 text-md font-semibold cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value === "" ? 1 : Number(e.target.value))
                  }
                  className="w-12 text-center outline-none bg-white"
                />
                <button
                  onClick={increase}
                  className="px-3 py-1 text-md font-semibold  cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button onClick={() => addToCart(productData._id, size)} className="border px-8 py-3 text-lg font-medium bg-white rounded-xl transition-all active:bg-black active:text-white cursor-pointer">
                Add to Cart
              </button>
            </div>

          </div>
          {/* Additional info */}
          <div className="w-full">

            <hr className="border-t border-gray-300 my-4" />


            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

              <div className="flex ">
                <div className="flex flex-col text-right text-sm text-gray-600 leading-8 items-start">
                  <span>SKU</span>
                  <span>Category</span>
                  <span>Tags</span>
                  <span>Share</span>
                </div>


                <div className="flex flex-col px-3 text-sm leading-8">
                  <span>:</span>
                  <span>:</span>
                  <span>:</span>
                  <span>:</span>
                </div>


                <div className="flex flex-col text-sm text-gray-600 leading-8">
                  <span>SS001</span>
                  <span>Sofas</span>
                  <span>Sofas, Chair, Home, Shop</span>
                  <span>

                    <div className="flex items-center gap-3">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LuFacebook className="w-4 h-4" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LuTwitter className="w-4 h-4" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LuLinkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </span>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      {/* Review additional info haru */}

      <div className="mt-10">
        {/* Tabs */}
        <div className="flex justify-center gap-10  border-gray-300 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 text-lg font-medium transition cursor-pointer ${activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-6 text-gray-400 text-base space-y-3 text-center">

          <p>{productData.description}</p>


          <div className="flex justify-center gap-6 mt-4">

            <img src={productData.image[0]}
              className="rounded-xl w-56 h-36 object-cover shadow"
            />
            <img src={productData.image[0]}
              className="rounded-xl w-56 h-36 object-cover shadow"
            />

          </div>
        </div>
      </div>
      {/* Related products */}
      <RelatedProducts category={productData.category} />
    </div >
  ) : <div className="opacity-0"></div>
}
export default Product