import ScrollToTop from "./components/ScrollToTop";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductViewPage from "./pages/ProductViewPage";

function App() {
  return(
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/produtos" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductViewPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App