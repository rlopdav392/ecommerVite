import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cartActions } from "../storeRedux/cartSlice";

export default function Product({ id, image, title, price, description }) {
  const dispatch = useDispatch();

  const handleAddItemTocart = () => {
    console.log("disparo el additem: ", id);
    dispatch(cartActions.addItem({ id: id }));
    toast.success("elemento añadido al carrito");
  };
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={handleAddItemTocart}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
