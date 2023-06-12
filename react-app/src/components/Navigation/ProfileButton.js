import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  let history = useHistory()

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
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      {user ? ( <> </>) : (
        <>
      <OpenModalButton
        buttonText="Log In"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
      />

      <OpenModalButton
        buttonText="Sign Up"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />}
      /> 
      </>)}
      {/* <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button> */}
      {/* <ul  ref={ulRef}> */}
      {/* {user ? ( */}
      {/* <> */}
      {/* <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li> */}

      {/* <p>{user.username}</p>
            <button onClick={handleLogout}>Log Out</button> */}
      {/* </> */}
      {/* ) : ( */}
      {/* <> */}
      {/* <OpenModalButton
        buttonText="Log In"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
      />

      <OpenModalButton
        buttonText="Sign Up"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />}
      />
    </> */}
  {/* )
} */}
{/* </ul> */ }
    </div >
  );
}

export default ProfileButton;
