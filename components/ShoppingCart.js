import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import ShoppingCartProduct from "./ShoppingCartProduct";

export default function ShoppingCart() {
  const { setShoppingCart, state, total } = useContext(ShoppingCartContext);
  const router = useRouter();
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      購物車
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={() => setShoppingCart(false)}
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                  {state.map((item, idx) => (
                    <ShoppingCartProduct
                      key={idx}
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      category={item.category}
                      description={item.description}
                      image={item.image}
                      quantity={item.quantity}
                    />
                  ))}
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>總額</p>
                    <p>$ {total.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() =>
                      router.push("/checkout") && setShoppingCart(false)
                    }
                    className="mt-6 w-full"
                  >
                    <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      結帳去
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
