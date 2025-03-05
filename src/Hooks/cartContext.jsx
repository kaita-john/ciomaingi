import {createContext, useContext, useState} from "react";


//Create a global Context. That is a Global Storage
const CartContext = createContext();


//Create CartProvider. This is a component to provide the CartContext.
//So if we need to access cart items it is through the CartProvider
export const CartProvider = ({children}) => { // Children represents what the components that will be wraped by CartProvider Component
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {

        /*setCart(prevState => {
            const exists = prevState.find(item => {
                return item.id === product.id
            })
        })*/

        setCart(prevState => {
            const existingItem = prevState.find(item => item.id === product.id);
            if (existingItem) {
                return prevState.map(item =>
                    //create a new product that is a copy of the previous item
                    item.id === product.id ? {...item, quantity: item.quantity + quantity} : item
                );
            } else {
                return [...prevState, {...product, quantity}];
            }
        });

    };


    const reduceCart = (product, quantity) => {
        setCart(prevState => {
            const existingItem = prevState.find(item => item.id === product.id);
            if (existingItem) {
                return prevState.map(item =>
                    //create a new product that is a copy of the previous item
                    item.id === product.id ? {...item, quantity: item.quantity - quantity} : item
                );
            } else {
                return [...prevState, {...product, quantity}];
            }
        });
    };

    const removeFromCart = (product) => {
        setCart(prevState => {
            const existingItem = prevState.findIndex(item => item.id === product.id)
            if (existingItem !== -1) {
                const updateCart = [...prevState]
                updateCart.splice(existingItem, 1)
                // If the cart is empty after removal, return an empty array
                if (updateCart.length === 0) {
                    return [];
                } else return updateCart;
            }else return prevState
        })
    }

    /*const removeFromCartB = (product, quantity) =>{
        setCart(prevState => {
            const existingItem = prevState.find(item => item.id === product.id)
            if (existingItem) {
                const existingIndex = prevState.indexOf(existingItem)
                const updateCart = [...prevState]
                updateCart.splice(existingIndex, 1)
                return updateCart
            }
        })
    }*/


    const clearCart = (product) => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, reduceCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
