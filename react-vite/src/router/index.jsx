import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductDetails from '../components/Products/ProductDetails';
import ProductsByCategory from '../components/Products/ProductsByCategory';
import AllProducts from '../components/Products/AllProducts';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:'/products/:productId',
        element: <ProductDetails />
      },
      {
        path: "/products/categories/:category",
        element: <ProductsByCategory />
      },
      {
        path: "/products",
        element: <AllProducts />
      },


    ],
  },
]);
