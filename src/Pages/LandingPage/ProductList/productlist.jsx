import {useNavigate} from "react-router-dom";
import {useGetItems} from "../../../Hooks/useAPI.js";
import './productlist.css'
import Makeyourcandle from "../MakeYourCandleForm/makeyourcandle.jsx";
import ShowList from "./showList.jsx";


const ProductList = ({page}) => {
    const navigate = useNavigate();
    const {product, loading, error} = useGetItems();

    if (!product) {
        return <p>Product details not found.</p>;
    }
    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    const filteredProducts = product.filter((item) => {
        if (page) { // Check if page prop exists
            return item.category_details.name === page;
        }
        return true;
    });

    return (
        <div className="section">

            {page === 'fragrance' && (
                <div></div>
            )}

            {/* Container */}
            <div className="container">

                {
                    page === 'Candle Making Supplies' && (
                        <div className="awesome-div">
                            <h2>Craft Your Own Eco-Friendly Candles</h2>
                            <p style={{color: 'black', marginBottom: 10}}>Craft beautiful, <strong>eco-friendly</strong> candles with
                                our <strong>premium
                                    supplies</strong>.
                                Whether you're a beginner or an expert, we offer everything you need to craft your own
                                unique
                                candles. From natural soy and beeswax to eco wicks, silicone molds, and vibrant mica
                                powders,
                                all our products are <strong>sustainably sourced</strong> to help you create with a purpose.
                            </p>
                            <ShowList filteredProducts={filteredProducts}/>
                        </div>
                    )
                }

                {
                    page === 'Fragrance Oils' && (
                        <div className="awesome-div">
                            <h2>Explore Our Fragrance Oils</h2>
                            <p style={{color: 'black', marginBottom: 10}}>
                                Explore our range of phthalate-free fragrance oils to make your candles truly unforgettable.
                                Our high-quality oils come in a variety of scents, from fresh florals to soothing lavender,
                                perfect for creating candles with rich, long-lasting fragrance. These versatile oils are
                                also perfect for use in soaps, bath products, room sprays, and other DIY projects.
                            </p>
                            <p style={{color: 'black', marginBottom: 10}}>
                                <strong>Fragrance Load Calculator:</strong> Use our simple <a href="YOUR_CALCULATOR_LINK">Fragrance
                                Load Calculator</a> to determine the ideal fragrance concentration for your candles. This
                                tool helps you calculate the right amount of fragrance oil, ensuring your candles smell
                                amazing! The calculator is designed for candles, but it can also be used for soap and
                                cosmetics. For our fragrances, we recommend using 8-10% load to have a nice scent throw of
                                your candle crafts.
                            </p>
                            <ShowList filteredProducts={filteredProducts}/>
                        </div>
                    )
                }

                {
                    page === 'Aromatherapy Essentials' && (
                        <div className="awesome-div">
                            <h2>Indulge in Wellness</h2>
                            <p style={{color: 'black', marginBottom: 10}}>
                                Indulge in our handcrafted candles and essential oils that promote well-being. We offer a
                                selection of limited-edition scented candles, reed diffusers, essential oils, car perfumes,
                                and incense sticks—perfect for creating a soothing atmosphere wherever you go.
                            </p>
                            <ShowList filteredProducts={filteredProducts}/>
                        </div>
                    )
                }


                {
                    page === 'Make Your Candle' && (
                        <Makeyourcandle/>
                    )
                }


            </div>
            {/* /Container */}
        </div>
    );
};

export default ProductList;
