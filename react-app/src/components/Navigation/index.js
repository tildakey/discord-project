import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
		<OpenModalButton
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
      />

      <OpenModalButton
        buttonText="Sign Up"
        modalComponent={<SignupFormModal />}
      /> 
		</div>
	);
}

export default Navigation;
