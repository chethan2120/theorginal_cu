import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import { AccountProvider } from "./context/AccountContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { WishlistProvider } from "./context/WishlistContext.tsx";
import About from "./pages/About.tsx";
import Account from "./pages/Account.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import Contact from "./pages/Contact.tsx";
import Faq from "./pages/Faq.tsx";
import Heritage from "./pages/Heritage.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import { PrivacyPolicy, ReturnPolicy, ShippingPolicy, Terms } from "./pages/Policies.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Shop from "./pages/Shop.tsx";
import WhyUs from "./pages/WhyUs.tsx";
import Wishlist from "./pages/Wishlist.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:slug" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order/:id" element={<OrderConfirmation />} />
                <Route path="heritage" element={<Heritage />} />
                <Route path="why-us" element={<WhyUs />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<Faq />} />
                <Route path="shipping" element={<ShippingPolicy />} />
                <Route path="returns" element={<ReturnPolicy />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="account" element={<Account />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AccountProvider>
    </BrowserRouter>
  );
}
