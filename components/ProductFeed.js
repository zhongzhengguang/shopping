import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import Product from "./Porduct";
export default function ProductFeed({ products }) {
  const { searchProuduct, setSearchProuduct } = useContext(ShoppingCartContext);

  return (
    <div className=" grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .filter((item) => {
          return searchProuduct.toLowerCase() === ""
            ? item
            : item.title.toLowerCase().includes(searchProuduct);
        })
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}
