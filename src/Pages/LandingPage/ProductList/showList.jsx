import './productlist.css'
import {useNavigate} from "react-router-dom";


const ShowList = ({filteredProducts}) => {

    const navigate = useNavigate();

    return (
        <div className="row">
            {filteredProducts.map((product, index) => (

                <div
                    className="col-lg-3 col-md-3 col-sm-4 col-6"
                    key={product.id}
                    style={{cursor: "pointer", width: "auto"}}
                    onClick={() => {
                        navigate(`/products/${product.id}`, {state: product})
                    }}>

                    <div className="product" style={{width: "auto"}}>
                        <div style={{padding: 20}} className="">
                            <img width={190} height={180} src={product.mainimage} alt={product.name}/>
                        </div>
                        <div className="product-body">
                            {/* <p className="product-category">{product.category || "No category"}</p> */}
                            <a style={{
                                color: '#00312e',
                                marginTop: '10px',
                                fontSize: "16px",
                                opacity: "600%"
                            }} href="#">{product.name}</a>
                            <h4
                                className="product-price"
                                style={{
                                    marginTop: '10px',
                                    marginBottom: '10px'
                                }}
                            >
                                KES {product.price}
                            </h4>
                        </div>
                        <button
                            style={{
                                width: "98%",
                                backgroundColor: "#00312e", // Light gray background for a light theme
                                border: "1px solid #E0E0E0", // Light gray border for a subtle look
                                color: "white", // Dark gray text for contrast
                                padding: "8px 16px", // Adequate padding for a clean button
                                borderRadius: "4px", // Rounded corners for a modern look
                                cursor: "pointer", // Indicate interactivity
                                marginTop: "0px", // Maintain margin from the product
                                marginBottom: "2px", // Maintain margin from the product
                            }}
                            /*onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#E9ECEF"; // Slightly darker on hover
                                e.currentTarget.style.color = "#1A253B"; // Darker text on hover
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#F8F9FA"; // Back to light gray
                                e.currentTarget.style.color = "#333"; // Back to dark gray
                            }}*/
                        >
                            <i
                                style={{
                                    color: "white", // Dark gray text for contrast
                                }}
                                className="fa fa-eye"></i> View More
                        </button>
                    </div>


                </div>
            ))}
        </div>
    );
};

export default ShowList;
