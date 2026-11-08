
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router";
import "./App.css";

import { useEffect } from "react";
import { useThemeStore } from "./stores/themeStore";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import AllProducts from "./pages/AllProducts";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        const root = document.documentElement;

        root.classList.toggle("dark", theme === "dark");
        root.style.colorScheme = theme;
    }, [theme]);

    return (        
        <div dir="rtl">
            <Routes>

                {/* Main Website */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="my-orders" element={<MyOrders />} />
                    <Route path="order-success" element={<OrderSuccess />} />
                    <Route path="about" element={<About />} />
                    <Route path="products" element={<AllProducts />} />
                </Route>

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Routes>
        </div>
    );
}

export default App;
