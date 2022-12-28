import { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
export const ShoppingCartContext = createContext({});

function stateReducer(state, { type, payload }) {
  const items = state.find((product) => product.title === payload.title);

  switch (type) {
    case "increase":
      if (items) {
        return state.map((item) =>
          item.title === payload.title
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : { ...item }
        );
      }
      return [...state, payload];
    case "decrease":
      if (items.quantity === 1) {
        return state.filter((product) => product.title !== payload.title);
      }
      if (items) {
        return state.map((item) =>
          item.title === payload.title
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : { ...item }
        );
      }
      return [...state, payload];
    case "delete":
      return state.filter((product) => product.title !== payload.title);
    case "reset":
      return [];
    default:
      throw new Error();
  }
}
function initState() {
  if (typeof window !== "undefined") {
    const storageEvents = localStorage.getItem("state");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
  }
}
export const ShoppingCartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState(false);
  const [state, dispatch] = useReducer(stateReducer, [], initState);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchProuduct, setSearchProuduct] = useState("");
  const [currentProuduct, setCurrentProuduct] = useState([]);

  useEffect(() => {
    setCurrentProuduct(state);
  }, [state]);
  useEffect(() => {
    setTotal(
      state.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [state]);
  useEffect(() => {
    setQuantity(state.length);
  }, [state]);
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("can't find data");
      });
  }, []);
  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        state,
        dispatch,
        quantity,
        total,
        searchProuduct,
        setSearchProuduct,
        products,
        setProducts,
        currentProuduct,
        setCurrentProuduct,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
