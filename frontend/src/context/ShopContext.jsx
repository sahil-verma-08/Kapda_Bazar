import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createContext } from "react";
export const ShopContext = createContext();
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from 'react-router-dom';

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 100;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const navigate=useNavigate()
   
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size.");
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    
    
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };
    
    const updateCartQuantity = (item_Id, size, quantity) => {
        
        let cartData = structuredClone(cartItems);
        
            cartData[item_Id][size] = quantity;
            setCartItems(cartData);
        
    };

    const getCartAmount=()=>{
        let totalAmount =0;
        for (const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            for (const item in cartItems[items]){

                try{
                    if(cartItems[items][item]>0){
                        totalAmount+= itemInfo.price * cartItems[items][item]
                    }

                }catch(error){}
            }
        }
        return totalAmount;
    }
    const value = {
        products, currency, delivery_fee,
        setSearch, search, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateCartQuantity,getCartAmount,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
