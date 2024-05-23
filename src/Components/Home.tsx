/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Home.css';
import { Product } from './Product';
import { SearchHeader } from './SearchHeader';
import emptysearch from '../assets/emptysearch.png';
import CustomPopup from './CustomPopup';
import { useSelector, useDispatch } from 'react-redux';
import { setActionType, setShowPopup } from '../app/popupSlice';
import { RootState } from '../app/store';
import {ProductData} from'../type'
export const Home: React.FC = () => {
    const [product, setProduct] = useState<ProductData[]>([]);
    const [filterData, setFilterData] = useState<ProductData[]>([]);
    const dispatch = useDispatch();
    const { showPopup } = useSelector((state: RootState) => state.popup);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                const productData = data.categories.map((product: any) => ({
                    productId: product.idCategory,
                    productName: product.strCategory,
                    productImage: product.strCategoryThumb
                }));
                setProduct(productData);
                setFilterData(productData);
                handleInactiveUser();
            } catch (e) {
                console.error("Something went wrong", e);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            setFilterData(product);
        } else {
            const filteredData = product.filter(product => product.productName.toLowerCase().includes(searchTerm));
            setFilterData(filteredData);
        }
        handleInactiveUser();
    };

    const handleClosePopup = () => {
        dispatch(setShowPopup(false));
    };

    const handleLogin = () => {
        console.log('Redirecting to login page...');
        dispatch(setShowPopup(false));
        return window.location.href = '/login';
    };

    const handleInactiveUser = () => {
        const allUsersString = localStorage.getItem('user');
        if (allUsersString) {
            const allUsers = JSON.parse(allUsersString);
            const isActive = allUsers.some((user: any) => user.status === 'active');
            if (isActive) {
                const activeUser = allUsers.find((user: any) => user.status === 'active');
                setEmail(activeUser.email);
            } else {
                console.log("---we have the status " + isActive);
                dispatch(setShowPopup(true));
                dispatch(setActionType('status'));
                return;
            }
        }
    };

    const handleProductClick = () => {
        handleInactiveUser();
    };

    return (
        <>
            <SearchHeader handleSearch={handleSearch} />
            <div className='product-container' onClick={handleProductClick}>
                {filterData.length === 0 ? (
                    <div className='empty-search'>
                        <img src={emptysearch} alt='' />
                        <p>No Result found !!</p>
                    </div>
                ) : (
                        filterData.map((productData) => (
                            <Product key={productData.productId} product={productData} />
                        ))
                    )}
            </div>
            {showPopup && <CustomPopup handleClose={handleClosePopup} handleLogin={handleLogin} />}
        </>
    );
};

export default Home;
