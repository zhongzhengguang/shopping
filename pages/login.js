import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState(false);
  const [activeItem, setActiveItem] = useState("siginIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (activeItem === "register") {
        const res = createUserWithEmailAndPassword(auth, name, email, password);
      } else if (activeItem === "siginIn") {
        const res = signInWithEmailAndPassword(auth, name, email, password);
      }
    } catch (err) {
      console.log("XX");
    }
  }

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  return (
    <div>
      <header className="flex items-center justify-between bg-gray-900 p-2 py-2">
        <h1 className=" text-white font-bold text-4xl ">請登入</h1>
      </header>

      <div className=" grid items-center h-[100vh] w-full justify-center bg-gray-400">
        <div className="flex flex-col border shadow-2xl p-10 w-full text-black">
          <div className=" flex items-center justify-center">
            <div
              className=" text-center w-[15vh] mb-5 border rounded-l-lg border-white shadow-gray-400  p-3 cursor-pointer hover:scale-105 ease-in  duration-75"
              active={activeItem === "register"}
              onClick={() => setActiveItem("register")}
            >
              註冊
            </div>
            <div
              className=" text-center w-[15vh] mb-5 border rounded-r-lg border-white shadow-gray-400  p-3 cursor-pointer hover:scale-105 ease-in  duration-75"
              active={activeItem === "siginIn"}
              onClick={() => setActiveItem("siginIn")}
            >
              登入
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col justify-between items-center space-y-10"
          >
            <input
              label="姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="name"
              className="p-2 h-full w-[30vh] rounded-md focus:outline-none px-4"
            />
            <input
              label="信箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              className="p-2 h-full w-[30vh] rounded-md focus:outline-none px-4"
            />
            <input
              label="密碼"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="password"
              className=" p-2 h-full w-[30vh] rounded-md focus:outline-none px-4"
            />
            <button className="mt-10 border rounded-lg w-full p-2 h-10 hover:scale-105 ease-in  duration-300 text-black ">
              {activeItem === "register" && "註冊"}
              {activeItem === "siginIn" && "登入"}
            </button>

            {err && (
              <span className=" bg-white rounded-lg p-2">
                !! email or password is not defind !!
              </span>
            )}
          </form>
          <button
            onClick={() => signInWithGoogle()}
            className=" text-black  mt-10 border rounded-lg w-full p-2 h-10 hover:scale-105 ease-in  duration-300 "
          >
            Google 登入
          </button>
        </div>
      </div>
    </div>
  );
}
