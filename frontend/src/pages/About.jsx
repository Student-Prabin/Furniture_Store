import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";


const About = () => {
  const nav = useNavigate();
  return (
    <div>
      <Title page={"About"} />

      <div className="flex flex-col text-center gap-2 my-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-2">About Our Furniture Store</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-black">FurniHaven</span>, where style meets comfort.
          We believe your home should reflect who you are — elegant, warm, and timeless.
          That's why we handpick every piece with love, quality, and craftsmanship in mind.
        </p>
      </div>


      <div className="grid md:grid-cols-2 gap-10 px-6 md:px-20 py-10">
        {/* Mission */}
        <div className="bg-[#FAF4F4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
          <img
            src={assets.blog_3}
            alt="Mission"
            className="w-full h-52 object-cover"
          />
          <div className="p-8 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission is simple — to transform houses into homes through beautiful,
              functional, and sustainable furniture. We strive to bring modern designs
              that blend comfort, affordability, and durability.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-[#FAF4F4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
          <img
            src={assets.blog_2}
            alt="Vision"
            className="w-full h-52 object-cover"
          />
          <div className="p-8 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where great design is accessible to everyone.
              Our goal is to inspire every customer to create spaces they love —
              spaces that tell stories, evoke emotions, and last for generations.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="flex flex-col items-center gap-6 px-6 md:px-20 py-12 bg-white">
        <h3 className="text-2xl font-semibold mb-3">Why Choose Us?</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {/* Quality */}
          <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="p-6">
              <h4 className="font-semibold text-lg mb-2">High Quality</h4>
              <p className="text-gray-700">
                Each piece is crafted with premium materials and attention to detail for long-lasting quality.
              </p>
            </div>
          </div>

          {/* Modern Design */}
          <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="p-6">
              <h4 className="font-semibold text-lg mb-2">Modern Design</h4>
              <p className="text-gray-700">
                Our collection blends timeless elegance with modern aesthetics to fit any home style.
              </p>
            </div>
          </div>

          {/* Sustainable */}
          <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="p-6">
              <h4 className="font-semibold text-lg mb-2">Sustainable Materials</h4>
              <p className="text-gray-700">
                We're committed to eco-friendly practices and responsibly sourced materials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16 bg-[#f0e7e7]">
        <h3 className="text-2xl font-semibold mb-4">Ready to Redefine Your Home?</h3>
        <p className="text-gray-700 mb-6">
          Explore our latest collections and bring your dream interiors to life today.
        </p>
        <button onClick={() => nav('/shop')} className="border border-black rounded-md px-6 py-2 hover:bg-black hover:text-white transition cursor-pointer">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default About;
