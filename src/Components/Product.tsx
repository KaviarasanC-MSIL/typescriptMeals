/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../app/cartSlice';
import {ProductProps} from '../type'



export const Product: React.FC<ProductProps> = ({ product }) => {
    const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
    const dispatch = useDispatch();
    const usersString = localStorage.getItem('user');
    useEffect(() => {
        try {
            
            if (usersString) {
                const users: any[] = JSON.parse(usersString);
                const activeUser = users.find(user => user.status === 'active');
                if (activeUser) {
                    const cart = activeUser.cart || [];
                    const productInCart = cart.some((item:any) => item.productId === product.productId);
                    setIsProductInCart(productInCart);
                }
            }
        } catch (error) {
            console.error('Error retrieving or parsing user data from localStorage:', error);
        }
    }, [product.productId]);
    

    const handleCartAction = () => {
        if (usersString) {
            try {
                const users: any[] = JSON.parse(usersString);
                const activeUser = users.find(user => user.status === 'active');
                if (activeUser) {
                    activeUser.cart = activeUser.cart || [];
                    const productIndex = activeUser.cart.findIndex((item: any) => item.productId === product.productId);
                    if (productIndex === -1) {
                        activeUser.cart.push(product);
                        setIsProductInCart(true);
                        dispatch(addToCart(product));
                    } else {
                        activeUser.cart.splice(productIndex, 1);
                        setIsProductInCart(false);
                        dispatch(removeFromCart(product.productId));
                    }
                    localStorage.setItem('user', JSON.stringify(users));
                }
            } catch (error) {
                console.error('Error handling cart action:', error);
            }
        }
    };
    
    

    return (
        <div className='product'>
            <Link to={`/category/${product.productName}`} >
                <div className='img'>
                    <img src={product.productImage} alt={`Image of ${product.productName}`} />
                </div>
            </Link>
            <div className='details'>
                <h3>{product.productName}</h3>
                {isProductInCart ? (
                    <button className='remove-cart-btn' onClick={handleCartAction}>Remove from Cart</button>
                ) : (
                    <button onClick={handleCartAction}>Add to Cart</button>
                )}
            </div>
        </div>
    );
};

export default Product;
