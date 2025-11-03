import { Link } from "react-router-dom";

const Button = ({ to, text }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button className="mt-6 text-xl font-medium relative group transition-transform duration-300 hover:scale-105 cursor-pointer">
        <Link to={to} onClick={handleClick}>
          {text}
        </Link>
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-1/2"></span>
      </button>
    </>
  );
};

export default Button;
