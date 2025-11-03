import { LuClock, LuMapPin, LuPhone } from "react-icons/lu";
import Title from "../components/Title.jsx";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div>
      <Title page={"Contact"} />
      <div className="flex flex-col text-center gap-2 my-15">
        <p className="text-3xl font-semibold">Get In Touch With Us</p>
        <p className="text-xl text-[#9F9F9F]">
          For More Information About Our Product & Services, please feel free to drop us <br />
          an email. Our staff will always be there to help you out. Do not hesitate!
        </p>
      </div>


      <div className="grid md:grid-cols-2 gap-6 md:gap-10 px-6 md:px-16 py-10">
        {/* Left Side - Contact Info */}
        <div className="flex flex-col justify-center gap-6 text-center md:text-left">
          <div className="flex items-start justify-center md:justify-start gap-3">
            <LuMapPin className="w-5 h-5 text-black mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-700">123 Main Street, Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="flex items-start justify-center md:justify-start gap-3">
            <LuPhone className="w-5 h-5 text-black mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-700">+977 9800000000</p>
            </div>
          </div>

          <div className="flex items-start justify-center md:justify-start gap-3">
            <LuClock className="w-5 h-5 text-black mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Working Time</h3>
              <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center md:items-start gap-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-4/5 md:w-3/4 border border-black rounded-md bg-transparent px-4 py-2 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-4/5 md:w-3/4 border border-black rounded-md bg-transparent px-4 py-2 outline-none"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-4/5 md:w-3/4 border border-black rounded-md bg-transparent px-4 py-2 outline-none"
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="w-4/5 md:w-3/4 border border-black rounded-md bg-transparent px-4 py-2 outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-2/5 md:w-1/3 border border-black rounded-md px-4 py-2 hover:bg-black hover:text-white transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
