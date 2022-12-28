import React, { useContext, useState } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

export default function Porduct({
  id,
  title,
  price,
  description,
  category,
  image,
}) {
  const { dispatch } = useContext(ShoppingCartContext);

  function addToCart() {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      quantity: 1,
    };

    dispatch({ type: "increase", payload: product });
  }
  return (
    <div key={id} className=" flex relative flex-col m-5 bg-white z-30 p-10">
      <p className=" absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className=" flex h-[300px] w-full bg-black">
        <img src={image} className="w-full h-full" />
      </div>
      <h4>{title}</h4>
      <div className="flex"></div>
      <p className=" text-xs my-2 line-clamp-3">{description}</p>
      <div>{price} $</div>
      <button
        onClick={addToCart}
        className="mt-auto button p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200  to-yellow-400 border-yellow-300 rounded-sm focus:outline-none focus:ring-yellow-500 active:from-yellow-500"
      >
        Add to basket
      </button>
    </div>
  );
}
