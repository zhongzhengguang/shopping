import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { db, auth } from "../firebase";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
export default function checkout() {
  const {
    setShoppingCart,
    quantity,
    total,
    currentProuduct,
    setCurrentProuduct,
    dispatch,
  } = useContext(ShoppingCartContext);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const handleCheckout = async () => {
    router.push("/");
    if (currentProuduct)
      try {
        await updateDoc(doc(db, "usersproducts", user.uid), {
          products: [
            {
              title: currentProuduct.map((item) => item.title),
              price: currentProuduct.map((item) => item.price),
              quantity: currentProuduct.map((item) => item.quantity),
              total: total,
            },
          ],
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

  return (
    <div className=" bg-gray-100 ">
      <Header />
      <div>
        <div className=" flex flex-col space-y-10 absolute top-[10vh]">
          {quantity > 0 ? (
            <h1 className=" text-4xl font-bold p-5">你的購物籃</h1>
          ) : (
            <h1 className=" text-4xl font-bold p-5">你的購物籃空了</h1>
          )}
          <div>
            {currentProuduct.map((item, idx) => (
              <CheckoutProduct
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
            <button onClick={handleCheckout} className="mt-6 w-full">
              <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                結帳去
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
