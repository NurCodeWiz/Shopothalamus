// import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { BiSearchAlt2 } from "react-icons/bi";
import "./Navigation.css";
import { FaLocationDot } from "react-icons/fa6";
import { useRef, useState } from "react";

function Navigation() {
  const user = useSelector(state => state.session.user);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const searchInput = useRef();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.split(' ').join('+');
    navigate(`/products/?name=${query}`);
    setSearch("");
  }

  // const focusSearch = (e) => {
  //   e.preventDefault();
  //   searchInput.current.focus();
  // }

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
         <form className='search-form' onSubmit={handleSearch}>
          <input type="text" placeholder="Type to search..." className='search-bar'
          onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            value={search}
            onChange={e => setSearch(e.target.value)}
            ref={searchInput}
          />
          {/* Keep this input display none for search on [enter/return] button press */}
          <input type="submit" style={{display:"none"}}/>
          <button
            type="submit"
            className={'search-btn' + (searchFocus ? '  search-focus' : '')}
            // onClick={focusSearch}
          >
            <BiSearchAlt2 size={18}/>
          </button>
        </form>
          {/* <button className='search-btn' onClick={() => alert('Feature coming soon')}><BiSearchAlt2 /></button> */}
        </div>
        {user && (
          <div className='logged-user-navigation-bar'>
            <div id="to-name">Deliver to {user.first_name}</div>
              <div className='user-address'> <FaLocationDot /> USA </div>
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
