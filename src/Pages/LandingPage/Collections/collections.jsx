import makeyourcandle from '/src/assets/img/makeyourcandle.jpg'
import aromatherapyessentials from '/src/assets/img/aromatherapyessentials.jpg'
import candlemakingsupplies from '/src/assets/img/candlemakingsupplies.jpeg'
import fragranceoil from '/src/assets/img/fragranceoil.jpg'
import {useGetCategories} from "../../../Hooks/useAPI.js";
import React from "react";

const Collections = ({onCategorySelect}) => {

    const {categories, categoryloading, error} = useGetCategories();
    const handleCategoryClick = (categoryName) => {
        onCategorySelect(categoryName); // Pass selected category to LandingPage
    };


    const image = ((index) => {
        if (index === 0) {
            return <img src={fragranceoil} alt=""/>
        }
        if (index === 1) {
            return <img height={175} src={candlemakingsupplies} alt=""/>
        }
        if (index === 2) {
            return <img src={aromatherapyessentials} alt=""/>
        }
        if (index === 3) {
            return <img src={makeyourcandle} alt=""/>
        }
    })


    return (

        <div className="">
            {/* container */}
            <div className="container">
                {/*row */}
                <div className="row">
                    {/* shop */}
                    {categories && categories.map((category, index) => {
                        return <div className="col-md-3 col-xs-6" key={category.id}
                                    onClick={() => {handleCategoryClick(category.name)}}
                        > {/* Added key prop */}
                            <div className="shop">
                                <div className="shop-img">
                                    {image(index)}
                                </div>
                                <div className="shop-body">
                                    <h4
                                        style={{
                                            borderRadius: "15px",
                                            color: "white",
                                            backgroundColor: "rgba(0, 0, 0, 0.3)", /* Changed to semi-transparent black for better visibility */
                                            padding: "5px",
                                            position: "relative", /* Fix the h4 at the top of the viewport */
                                            top: 0, /* Position at the very top of the page */
                                            left: 0, /* Align to the left of the page */
                                            width: "100%", /* Span the full width of the viewport */
                                            zIndex: 1000, /* Ensure it stays on top of other elements */
                                            textAlign: "center", /* Center-align text for better aesthetics */
                                            margin: "17px 20px", /* Remove default margins */
                                            fontSize: "15px", /* Adjust font size for readability */
                                        }}
                                    >
                                        {category.name}
                                    </h4>
                                    {/*<a href="#" style={{color: "white"}} className="cta-btn">*/}
                                    {/*    Shop now <i className="fa fa-arrow-circle-right"></i>*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        </div>;
                    })}
                    {/* /shop */}

                </div>
                {/*/row */}
            </div>
            {/*{categoryloading && <p>Loading Top...</p>}*/}
            {error && <p className="error">{error}</p>}
            {/*/container */}
        </div>


    );
}

export default Collections