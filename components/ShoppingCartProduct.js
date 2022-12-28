import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
export default function ShoppingCartProduct({
  id,
  title,
  price,
  category,
  description,
  image,
  quantity,
}) {
  const { dispatch } = useContext(ShoppingCartContext);

  function decreaseCartQuantity() {
    const product = {
      title,
      quantity: 1,
    };
    dispatch({ type: "decrease", payload: product });
  }
  function deleteCart() {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      quantity: 1,
    };
    dispatch({ type: "delete", payload: product });
  }

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
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img src={image} className=" w-full h-full" />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">{title}</a>
                  </h3>
                  <p className="ml-4">${price}</p>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className=" flex justify-between w-[10vh] items-center">
                  <AiOutlineMinus
                    className=" cursor-pointer"
                    onClick={decreaseCartQuantity}
                  />
                  <p className="text-gray-500">{quantity}</p>
                  <AiOutlinePlus
                    className=" cursor-pointer"
                    onClick={addToCart}
                  />
                </div>
                <div className="flex">
                  <button
                    onClick={deleteCart}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-red-500"
                  >
                    移除商品
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
