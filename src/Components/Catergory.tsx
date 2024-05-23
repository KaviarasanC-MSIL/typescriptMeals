import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Category.css';
import {Meal} from '../type'


export const Catergory:React.FC = () => {
    const { productName } = useParams<{ productName: string }>();
    const [categoryData, setCategoryData] = useState<Meal[]>([]);
    console.log(productName);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${productName}`);
                const data = await response.json();


                const mappedData = data.meals.map((meal:any) => ({
                    id: meal.idMeal,
                    name: meal.strMeal,
                    image: meal.strMealThumb
                }));
                setCategoryData(mappedData);

            } catch (error) {
                console.error("Something went wrong", error);
            }
        };
        fetchData();
    }, [productName]);

    return (
        <>
            <h1 className='card-heading'>Category Product :{productName} </h1>

            <div className='card-container'>

                {categoryData.map((meal) => (
                    <div className='card-product' key={meal.id}>
                        <Link to={`/category-details/${meal.id}`} >
                            <div className="img">
                                <img src={meal.image} alt={meal.name} />
                            </div>
                        </Link>
                        <div className="card-product-details">
                            <h3>{meal.name}</h3>
                        </div>


                    </div>
                ))}

            </div>
        </>
    );
};
