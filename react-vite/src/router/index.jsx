import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductDetails from '../components/Products/ProductDetails';
import ProductsByCategory from '../components/Products/ProductsByCategory';
import AllProducts from '../components/Products/AllProducts';
import UpdateReview from '../components/UpdateReview/UpdateReview';
import Carts from '../components/Carts/Carts'
import FeaturedPage from '../components/HomePage/HomePage';
import OwnedProducts from '../components/OwnedProducts/OwnedProducts';
import CreateProductForm from '../components/Products/CreateProductForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:<FeaturedPage/>,
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
      {
        path: '/products/users/:userId',
        element: <OwnedProducts />
      },
      {
        path: '/products/new',
        element: <CreateProductForm />
      },



    ],
  },
]);
