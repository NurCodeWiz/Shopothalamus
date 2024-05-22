import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { CartProvider } from "../context/CartProvider";
import Footer from "../components/Footer/Footer";
export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <CartProvider>
         <div className="content">
          <Navigation />
          {isLoaded && <Outlet />}
         </div>
         {isLoaded &&<Footer/>}
         <Modal />
        </CartProvider>
      </ModalProvider>
    </>
  );
}
