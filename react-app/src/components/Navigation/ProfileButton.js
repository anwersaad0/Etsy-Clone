import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    history.push('/');
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="username-li">{user.username}</li>
            <li className="email-li">{user.email}</li>
            <li className="nav-divider"></li>
            <li className="user-items-li">
              <NavLink className="user-items-link" to={'/items/current'}>My Listings</NavLink>
            </li>
            <li className="create-item-li">
              <NavLink className="create-item-link" to={'/items/new'}>Create Listing</NavLink>
            </li>
            <li className="nav-divider"></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              buttonClass="login-btn"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <div className="nav-divider"></div>

            <OpenModalButton
              buttonText="Sign Up"
              buttonClass="signup-btn"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
