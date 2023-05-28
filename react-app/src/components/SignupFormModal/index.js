import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-div">
			<h1>Sign Up</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul className="signup-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">					
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="signup-text">		
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className="confirm-signup" type="submit">Sign Up</button>
			</form>
		</ div>
	);
}

export default SignupFormModal;