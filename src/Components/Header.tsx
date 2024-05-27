import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
//import {useDispatch } from 'react-redux';
//import { signOut } from '../app/userSlice';

export const Header: React.FC = () => {
//  const dispatch = useDispatch();
  const usersString = localStorage.getItem('user');
  const handleSignOut = () => {
    if (usersString) {
      try {
        const users: any[] = JSON.parse(usersString);
        console.log("storage signout clicked", users);
        const activeUser = users.find(user => user.status === 'active');
        if (activeUser) {
          console.log("storage signout clicked", activeUser.cart);
          activeUser.status = 'inactive';
          localStorage.setItem('user', JSON.stringify(users));
        }
      } catch (error) {
        console.error('Error retrieving or parsing user data from localStorage:', error);
      }
    }
    setTimeout(() => {
      // Redirect to the login page
       window.location.href = '/login';
    }, 100); 
  };
  
  

  const isLoggedIn = () => {
    if (usersString) {
        try {
            const users: any[] = JSON.parse(usersString);
            const activeUser = users.find(user => user.status === 'active');
            if (activeUser) {
                return !!activeUser;
            }
        } catch (error) {
            console.error('Error retrieving or parsing user data from localStorage:', error);
        }
    }
    
  };

  return (
    <div className='navbar'>
      <div className='logo'>FoodLogo</div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/favourite"}>Favorite</Link>
        </li>
        
        {isLoggedIn() ? (
          <li>
            <a href="#" onClick={handleSignOut}>SignOut</a>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
