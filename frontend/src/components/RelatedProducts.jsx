import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext.jsx"
import SubTitle from "./SubTitle.jsx";
import ProductItem from "./ProductItem.jsx";

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);

      setRelated(productsCopy.slice(0, 4));

    }
  }, [products])
  return (
    <div className="my-24 flex flex-col items-center">
      <SubTitle title={'Related Products'} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 gap-y-6">
        {
          related.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))
        }
      </div>

    </div>
  )
}
export default RelatedProducts