import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductDetails from '../components/Products/ProductDetails';
import ProductsByCategory from '../components/Products/ProductsByCategory';
import AllProducts from '../components/Products/AllProducts';
import UpdateReview from '../components/UpdateReview/UpdateReview';
import Carts from '../components/Carts/Carts'

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
      {
        path:'/products/:productId/review/:reviewId/edit',
        element: <UpdateReview />
      },
      {
        path:'/carts',
        element: <Carts />
      },



    ],
  },
]);
