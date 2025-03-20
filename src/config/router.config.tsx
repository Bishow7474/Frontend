import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import('../pages/auth/login/login.page'));
const RegisterPage = lazy(() => import('../pages/auth/register/register.page'));
const ForgetPassword = lazy(() => import('../pages/auth/forget-password/forget-password.page'))

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
            element: (
                    <RegisterPage />
            ),
        },
        {
            path: "/forget-password",
            element: (
                    <ForgetPassword />
            ),
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
};

export default RouterConfig;