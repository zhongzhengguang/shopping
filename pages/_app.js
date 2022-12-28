import "../styles/globals.css";
import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { AuthContextProvider } from "../context/AuthContext";
import {
  ShoppingCartContext,
  ShoppingCartContextProvider,
} from "../context/ShoppingCartContext";

function App({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const { currentProuduct } = useContext(ShoppingCartContext);
  useEffect(() => {
    const createUser = async () => {
      if (user) {
        try {
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            lastSeen: Timestamp.now(),
            uid: user.uid,
          });
          const createUsersProducts = await getDoc(
            doc(db, "usersproducts", user.uid)
          );
          if (!createUsersProducts.exists()) {
            await setDoc(doc(db, "usersproducts", user.uid), { products: [] });
          }
        } catch (err) {
          console.error("Error adding document: ", err);
        }
      }
    };
    createUser();
  }, [user]);

  return (
    <AuthContextProvider>
      <ShoppingCartContextProvider>
        <Component {...pageProps} />
      </ShoppingCartContextProvider>
    </AuthContextProvider>
  );
}
export default App;
