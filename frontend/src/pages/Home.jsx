
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import Button from "../components/Button.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import SubTitle from "../components/SubTitle.jsx";
import ProductItem from "../components/ProductItem.jsx";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  const { products } = useContext(ShopContext);
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    setTopPicks(products.slice(0, 4));
  }, [])
  return (
    <div>
      {/* hero section */}
      <div className="bg-[#FBEBB5] min-h-screen flex items-center justify-center">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between sm:mx-20 px-6 sm:px-0 py-10 w-full max-w-[1400px]">

          {/* Left side - Text + Button */}
          <div className="text-center sm:text-left flex-1 mt-8 sm:mt-0">
            <h1 className="text-4xl sm:text-7xl leading-tight">
              Rocket single <br /> seater
            </h1>
            <Button to={'/shop'} text={'Shop Now'} />
          </div>

          {/* Right side - Flipped Image */}
          <div className="flex justify-center sm:justify-end flex-1">
            <img
              src={assets.hero_img}
              alt="Rocket single seater"
              className="w-64 sm:w-[710px] h-auto object-contain scale-x-[-1]"
            />
          </div>

        </div>

      </div>



      {/* Side Table Section */}
      <div className="bg-[#FAF4F4] py-8">
        <div className="sm:mx-20 grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">

          {/* Left Section */}
          <div className="flex flex-col items-center h-full">
            <img
              src={assets.smallTable}
              alt="Side Table Left"
              className="w-full max-w-sm h-48 sm:h-60 md:h-64 object-contain"
            />
            <div className="mt-4 w-full text-center flex flex-col justify-end flex-1">
              <p className="text-4xl font-semibold">Side Table</p>
              <Button to={'/shop'} text={"View More"} />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center h-full">
            <img
              src={assets.sideSofa}
              alt="Side Table Right"
              className="w-full max-w-sm h-48 sm:h-60 md:h-64 object-contain"
            />
            <div className="mt-4 w-full text-center flex flex-col justify-end flex-1">
              <p className="text-4xl font-semibold">Side Table</p>
              <Button to={'/shop'} text={"View More"} />
            </div>
          </div>

        </div>
      </div>

      {/* Top Picks for You */}
      <div>
        <SubTitle title={'Top Picks For You'} desc={'Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.'} />

        <div className="grid grid-cols-2 sm:grid-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 p-10">
          {
            topPicks.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>

        <div className="flex justify-center my-5">
          <Button to={'/shop'} text={'View More'} />
        </div>
      </div>
      {/* New Arrival */}
      <div className="grid grid-cols-1 sm:grid-cols-2 m-auto bg-[#FBEBB5]">
        {/* Left Image */}
        <div className="flex items-center justify-center">
          <img
            className="w-full max-w-md sm:max-w-xl md:max-w-2xl object-contain"
            src={assets.asgardSofa}
            alt="sofa"
          />
        </div>

        {/* Right Texts */}
        <div className="flex flex-col justify-center gap-5 px-6 py-4 sm:px-8 place-self-center">
          <p className="text-2xl sm:text-3xl ml-15">New Arrivals</p>
          <p className="text-4xl sm:text-5xl font-bold">Asgard Sofa</p>
          <Link to="/">
            <button className="bg-transparent border border-black text-black px-10 py-3 font-semibold hover:bg-black hover:text-white transition-colors duration-300 mt-5 ml-15 cursor-pointer">
              Order Now
            </button>

          </Link>
        </div>
      </div>
      {/* Blogs section */}
      <SubTitle title={'Our Blogs'} desc={'Find a bright ideal to suit your taste with our great selection'} />
      <div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <BlogCard image={assets.blog_1} title={'Going all-in with millennial design'} />
          <BlogCard image={assets.blog_2} title={'Going all-in with millennial design'} />
          <BlogCard image={assets.blog_3} title={'Going all-in with millennial design'} />
        </div>
        <div className="flex justify-center my-5">
          <Button to={'/blog'} text={'View All Posts'} />
        </div>
      </div>

      {/* Insta banner */}
      <div
        className="relative bg-center bg-cover bg-no-repeat h-[60vh] flex flex-col justify-center items-center text-center "
        style={{ backgroundImage: `url(${assets.insta})` }} // 
      >
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xl sm:text-4xl font-bold mb-2">Our Instagram</p>
          <h2 className="text-md sm:text-3xl mb-5">
            Follow Our Store on Instagram
          </h2>
          <Link to="/">
            <button className="bg-[#FAF4F4] rounded-full px-10 py-3 text-xl shadow-lg hover:shadow-lg hover:bg-[#f1e9e9de] transition-all duration-100 cursor-pointer">
              Follow Us
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;
