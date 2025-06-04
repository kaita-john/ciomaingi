import React, {useRef, useState} from 'react';
import Collections from "../Collections/collections.jsx";
import ProductList from "../ProductList/productlist.jsx"; // If you need navigation, include this

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Fragrance Oils"); // State for selected category
  const productListRef = useRef(null); // Ref for the ProductList container

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Scroll to the ProductList container smoothly
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <Collections onCategorySelect={handleCategorySelect} />
      <div ref={productListRef}> {/* Attach ref to the ProductList container */}
        <ProductList page={selectedCategory} />
      </div>
    </div>
  );
};

export default LandingPage;