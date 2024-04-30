import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { NavLink, useNavigate } from 'react-router-dom';
// import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Profile.css'
import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import OpenModalButton from '../OpenModalButton';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const nav = useNavigate();
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    nav('/');
  };
  const ulClassName = `profile-dropdown${showMenu ? " show" : " hide"}`;

  return (
    <div className="pc-container">
        <FaUserCircle size={50} onClick={toggleMenu} className='pc-btn' /> {/* Using React Icons correctly */}
        {showMenu && (
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                  <>
                  <li>Hello, {user.firstName} {user.lastName}</li>
                  <li>{user.email}</li>
                  <hr className='pc-divider'/>
                  <div className='pc-links-container'>
                    <p>
                      <NavLink to='/orders' className='pc-links pc-orders'>Orders</NavLink>
                    </p>
                    <p>
                      <NavLink to='/products/new' className='pc-links pc-new-listing'>Create New Product</NavLink>
                    </p>
                    <p>
                      <NavLink to={`/products/users/${user.id}`} className='pc-links pc-manage'>Manage Your Products</NavLink>
                    </p>


                  </div>

                  <li>
                    <button onClick={logout} id='pc-logout-btn'>Log Out</button>
                  </li>
                </>

                ) : (
                  <>
                    <li>
                     <OpenModalButton buttonText="Log In" onItemClick={closeMenu} modalComponent={<LoginFormModal />} />
                    </li>
                    <li>
                      <OpenModalButton buttonText="Sign Up" onItemClick={closeMenu}  modalComponent={<SignupFormModal />} />
                   </li>
                 </>


                )}
            </ul>
        )}
    </div>
);


}

export default ProfileButton;
