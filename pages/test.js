import React, { useContext } from "react";

import { ShoppingCartContext } from "../context/ShoppingCartContext";

export default function test() {
  const { currentProuduct } = useContext(ShoppingCartContext);
  console.log(currentProuduct.map((item) => item.quantity));
  return <div>123</div>;
}
