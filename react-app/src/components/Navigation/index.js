import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<li className='site-title-div'>
				<i className='fas fa-dice-d20' />
				<NavLink className="site-title" exact to="/">Deck's Hobbies</NavLink>
			</li>
			{isLoaded && (
				<li className='nav-right-ui'>
					<NavLink className='listings-link' exact to='/items'>Listings</NavLink>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;