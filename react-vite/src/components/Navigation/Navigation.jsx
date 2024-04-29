// import React from "react";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { BiSearchAlt2 } from "react-icons/bi";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user);

  return (
    <div className='navigation-bar'>
      <ul className='navigation-ul-container'>
        <li className="logo-container">
         <NavLink to="/" className='logo-navigation-container'>
            <div className="logo-text">Shopothalamus</div>
            <img
              className="logo-img"
              src="https://rainforest-dev.s3.us-west-1.amazonaws.com/amazonArrow.png"
              alt="logo"
            />
          </NavLink>
        </li>
        <div className='search-container'>
          <input type="text" placeholder="Type to search..." className='search-bar'/>
          <button className='search-btn'><BiSearchAlt2 /></button>
        </div>
        {user && (
          <div className='logged-user-navigation-bar'>
            <NavLink to='/carts' className='cart-text'>
              <BsCart className="cart-favicon"/> Cart
            </NavLink>
          </div>
        )}
        <li>
          <ProfileButton />
        </li>
      </ul>
      <div className='categories-bar'>
        <ul className='category-ul'>
          <NavLink to='/products/categories/smart-home' className='cat-li'>Smart Home Automation</NavLink>
          <NavLink to='/products/categories/smart-entertainment' className='cat-li'>Smart Entertainment</NavLink>
          <NavLink to='/products/categories/smart-office' className='cat-li'>Smart Office Products</NavLink>
          <NavLink to='/products/categories/smart-pets' className='cat-li'>Smart Pet Products</NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
