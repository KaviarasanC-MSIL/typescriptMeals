import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setCart } from '../app/cartSlice';
import { ProductProps } from '../type';
import { RootState } from '../app/store';

export const Product: React.FC<ProductProps> = ({ product }) => {
    const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const usersString = localStorage.getItem('user');

    useEffect(() => {
        if (usersString) {
            try {
                const users: any[] = JSON.parse(usersString);
                const activeUser = users.find(user => user.status === 'active');
                if (activeUser) {
                    dispatch(setCart(activeUser.cart || []));
                }
            } catch (error) {
                console.error('Error retrieving or parsing user data from localStorage:', error);
            }
        }
    }, [dispatch, usersString]);

    useEffect(() => {
        setIsProductInCart(cartItems.some(item => item.productId === product.productId));
    }, [cartItems, product.productId]);

    const handleCartAction = () => {
        if (isProductInCart) {
            dispatch(removeFromCart(product.productId));
        } else {
            dispatch(addToCart(product));
        }
    };

    return (
        <div className='product'>
            <Link to={`/category/${product.productName}`}>
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
