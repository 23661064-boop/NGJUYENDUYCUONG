// src/App.tsx
import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- CÁC COMPONENT CỦA BẠN ---
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import LogoutPage from "./LogoutPage";
// @ts-ignore
import ProtectedRoute from "./ProtectedRoute";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
// @ts-ignore
import EditProduct from "./EditProduct";
// @ts-ignore
import ProductsPage from "./ProductsPage"; // ✅ THÊM: Trang sản phẩm
// @ts-ignore
import ContactPage from "./ContactPage"; // ✅ THÊM: Trang góp ý

// --- IMPORT MỚI CHO GIỎ HÀNG ---
import { CartProvider } from "./CartContext";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Trang chủ hiển thị danh sách sản phẩm */}
            <Route index element={<ListProducts_SP />} />

            {/* ✅ Route cho menu mới */}
            <Route path="products" element={<ProductsPage />} />
            <Route path="contact" element={<ContactPage />} />

            {/* Route giỏ hàng & thanh toán */}
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />

            <Route path="trang1" element={<Trang1 />} />
            <Route path="trang2" element={<Trang2 />} />
            <Route path="sanpham/:id" element={<Chitietsanpham />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />

            <Route
              path="admin/products"
              element={
                <ProtectedRoute>
                  <ListProducts_SP_Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
