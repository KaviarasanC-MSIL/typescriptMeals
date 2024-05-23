import React from "react";
import errorpage from '../assets/emptysearch.png'
import './NoPage.css'
import { Link } from "react-router-dom";
export const NoPage:React.FC = () =>{
    return(<>
    <div className="container">
    <img src={errorpage} alt ={errorpage}/>
    </div>
    <Link to={'/'}><button className="btn-home">Back to Home</button></Link>
    
    </>);
}