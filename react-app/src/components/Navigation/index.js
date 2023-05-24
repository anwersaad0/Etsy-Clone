import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<div>
					<li>
						<NavLink exact to='/items'>Listings</NavLink>
					</li>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				</div>
			)}
		</ul>
	);
}

export default Navigation;