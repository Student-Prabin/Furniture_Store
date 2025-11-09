import { useContext } from "react"
import { ShopContext } from "../context/ShopContext.jsx"
import SubTitle from "../components/SubTitle.jsx"
import ProductItem from "../components/ProductItem.jsx"

const Orders = () => {
  const { products, currency } = useContext(ShopContext)
  return (
    <div>
      <SubTitle title="My Orders" />
      <div className="px-20">
        {
          products.slice(1, 4).map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} description={item.desc} view={"column"} />
          ))
        }
      </div>
    </div>
  )
}
export default Orders