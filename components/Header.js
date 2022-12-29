import React, { useContext } from "react";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import ShoppingCart from "./ShoppingCart";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
export default function Header() {
  const { shoppingCart, setShoppingCart, quantity, setSearchProuduct } =
    useContext(ShoppingCartContext);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const SignOut = () => {
    auth.signOut();
  };

  return (
    <div className="fixed w-full h-20 z-[100] ">
      <header className="flex items-center justify-between bg-white p-2 py-2 shadow-md">
        <Link href="/" className=" text-black font-bold">
          購物網站
        </Link>
        <div className=" flex items-center h-10 ">
          <input
            onChange={(e) => setSearchProuduct(e.target.value)}
            type="text"
            className=" p-2 h-full md:w-[30vh] rounded-l-md focus:outline-none px-4 border"
          />
          <AiOutlineSearch className="border bg-yellow-400 h-full w-10 rounded-r-md" />
        </div>
        <div className=" flex items-center space-x-5">
          <div
            onClick={currentUser ? SignOut : () => signInWithGoogle()}
            className=" text-black cursor-pointer"
          >
            {currentUser ? currentUser.displayName : "登入 / 登出"}
          </div>

          <button onClick={() => setShoppingCart(true)} className="flex ">
            <AiOutlineShoppingCart className="rounded-full h-[5vh] w-[3vh] text-black" />
            <span className=" absolute top-2 right-0 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center ">
              <p>{quantity}</p>
            </span>
          </button>
          {shoppingCart && (
            <ShoppingCart
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          )}
        </div>
      </header>
    </div>
  );
}
