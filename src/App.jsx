import { useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Notfound from './Components/Notfound/Notfound';
import Login from './Components/Login/Login';
import Heart from './Components/Heart/Heart';
import Brand from './Components/Brand/Brand';
import Card from './Components/Card/Card';
import Category from './Components/Category/Category';
import YourInfo from './Components/YourInfo/YourInfo';
import UserContextProvider from './Context/UserContext';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import BrandDetails from './Components/BrandDetails/BrandDetails';
import ProtectRouter from './Components/ProtectRouter/ProtectRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProtectAuthority from './Components/ProtectAuthority/ProtectAuthority';
import CardContextProvider from './Context/CardContext';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';



const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'Products', element: <ProtectRouter><Products /></ProtectRouter> },
      { path: 'Register', element: <ProtectAuthority><Register /></ProtectAuthority> },
      { path: 'ProductDetails/:id/:category', element: <ProtectRouter><ProductDetails /></ProtectRouter> },
      { path: 'CategoryDetails/:id', element: <ProtectRouter><CategoryDetails /></ProtectRouter> },
      { path: 'BrandDetails/:id', element: <ProtectRouter><BrandDetails /></ProtectRouter> },
      { path: 'Brand', element: <ProtectRouter><Brand /></ProtectRouter> },
      { path: 'YourInfo', element: <ProtectRouter><YourInfo /></ProtectRouter> },
      { path: 'ResetPassword', element: <ProtectRouter><ResetPassword /></ProtectRouter> },
      { path: 'Card', element: <ProtectRouter><Card /></ProtectRouter> },
      { path: 'Checkout', element: <ProtectRouter><Checkout /></ProtectRouter> },
      { path: 'AllOrders', element: <ProtectRouter><AllOrders /></ProtectRouter> },
      { path: 'Login', element: <ProtectAuthority><Login /></ProtectAuthority> },
      { path: 'Heart', element: <ProtectRouter><Heart /></ProtectRouter> },
      { path: 'Category', element: <ProtectRouter><Category /></ProtectRouter> },
      { path: '*', element: <Notfound /> },
    ]
  }
]);
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CardContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ReactQueryDevtools />
          </UserContextProvider>
        </QueryClientProvider>
      </CardContextProvider>
    </>
  );
}

export default App;
