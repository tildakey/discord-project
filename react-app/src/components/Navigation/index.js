import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ProfileButton from './ProfileButton';
import { demoUser } from "../../store/session";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	let history = useHistory()
	const dispatch = useDispatch();

	const demoLogin = async (e) => {
		e.preventDefault()
		await dispatch(demoUser())
		history.push('/discovery')
	}

	return (
		<div>
			{sessionUser ? (<> </>) : (
				<div className='nav'>
					<span className='button-container'>
						<OpenModalButton
							buttonText="Log In"
							modalComponent={<LoginFormModal />}
						/>
					</span>

					<span className='button-container'>
						<OpenModalButton
							buttonText="Sign Up"
							modalComponent={<SignupFormModal />}
						/>
					</span>

					<span className='button-container'>
						<button onClick={demoLogin}>
							Demo Log-in
						</button>
					</span>
				</div>
			)
			}
		</div >
	);
}

export default Navigation;
