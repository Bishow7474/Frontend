import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import AdminLayout from "../pages/layout/admin-layout.page";
import AdminDashboard from "../pages/admin/dashbord/admin-dashbord.page";
import BannerList from "../pages/admin/banner/banner-list.page";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../context/auth.context";

const LoginPage = lazy(() => import("../pages/auth/login/login.page"));
const RegisterPage = lazy(() => import("../pages/auth/register/register.page"));
const ForgetPassword = lazy(
  () => import("../pages/auth/forget-password/forget-password.page")
);
//const AdminLayout = lazy(() => import("../pages/auth/admin/dashboard/admin-dashboard.page"))

const RouterConfig = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<>Loading...</>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "banner",
          Component: BannerList,
          //element: <>Banner Page</>,
        },
        {
          path: "brand",
          element: <>Brand Page</>,
        },
        {
          path: "category",
          element: <>Categories Page</>,
        },
        {
          path: "users",
          element: <>User Page</>,
        },
        {
          path: "products",
          element: <>Product Page</>,
        },
        {
          path: "orders",
          element: <>Order Page</>,
        },
        {
          path: "chat",
          element: <>Chat Page</>,
        },
        {
          path: "*",
          element: <>Error Pages</>,
        },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider Children={
        <>
          <ToastContainer theme="colored" />
          <RouterProvider router={router} />
        </>
      } />
    </>
  );
};

export default RouterConfig;
