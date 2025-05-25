import React from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {CartProvider} from "./Hooks/cartContext.jsx"; // Adjust path as needed
import Header from "./Components/Header/header.jsx";
import Footer from "./Components/Footer/footer.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage_File/landingPage.jsx";
import ProductDetails from "./Pages/LandingPage/ProductDetails/productdetails.jsx";
import CartPage from "./Pages/LandingPage/CartPage/cartpage.jsx";
import CheckoutPage from "./Pages/LandingPage/CheckoutPage/checkout.jsx";
import ItemListPage from "./Pages/LandingPage/ItemListPage/items.jsx";
import ItemUploadPage from "./Pages/LandingPage/ItemsUploadPage/itemsupload.jsx";
import Category from "./Pages/LandingPage/CategoryPage/category.jsx";
import Viewpurchases from "./Pages/LandingPage/ViewPurchasesPage/viewpurchases.jsx";
import ViewMakeYourCandles from "./Pages/LandingPage/MakeYourCandleForm/viewMakeYourCandles.jsx";
import CandleMakingClass from "./Pages/LandingPage/CandleMakingClass/candleMakingClass.jsx";
import ClassBookings from "./Pages/LandingPage/CandleMakingClass/viewClassBookings.jsx";
import LoginPage from "./Pages/LandingPage/LoginPage/loginPage.jsx";
import ErrorBoundary from "./Hooks/errorBoundary .jsx"; // Keep if you have global styles
import "./App.css";
import {AuthProvider} from "./Components/authContext.jsx";
import ProtectedRoute from "./Components/protectedRoute.jsx";
import AdminPage from "./Pages/LandingPage/AdminPage/adminpage.jsx";
import AboutUs from "./Pages/LandingPage/AboutUsPage/aboutus.jsx";

// Custom component to handle conditional rendering
const AppContent = () => {
    const location = useLocation();
    const hideHeaderFooter = ["/admin/index", "/login", "/admin/site"].includes(location.pathname); // Hide Header and Footer for login page

    return (
        <>
            {!hideHeaderFooter && <Header/>}
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/products/:productId" element={<ProductDetails/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/items" element={<ItemUploadPage/>}/>
                    <Route path="/items/edit" element={<ItemUploadPage/>}/>
                    <Route path="/items/list" element={<ItemListPage/>}/>
                    <Route path="/categories" element={<Category/>}/>
                    <Route path="/viewpurchases" element={<Viewpurchases/>}/>
                    <Route path="/viewmakecandles" element={<ViewMakeYourCandles/>}/>
                    <Route path="/makeyourcandle" element={<CandleMakingClass/>}/>
                    <Route path="/classbookings" element={<ClassBookings/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    {/*<Route path="/people" element={<ProtectedRoute/>}>
                        <Route index element={<PeoplePage/>}/>  Assume you have a PeoplePage component
                    </Route>*/}
                    <Route path="/admin/*" element={<ProtectedRoute/>}>
                        <Route path="index" element={<AdminPage/>}/>
                        <Route path="site" element={<AdminPage/>}/>
                    </Route>
                </Routes>
            </main>
            {!hideHeaderFooter && <Footer/>}
        </>
    );
};

function App() {
    return (
        <AuthProvider> {/* Wrap with AuthProvider before CartProvider */}
            <CartProvider>
                <BrowserRouter basename="/ciomaingi">
                    <ErrorBoundary>
                        <AppContent/>
                    </ErrorBoundary>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;



