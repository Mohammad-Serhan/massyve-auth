"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/login`,
				{
					email,
					password,
				}
			);

			if (response.status === 200) {
				const { token } = response.data;
				localStorage.setItem("token", token); // Store the JWT token
				router.push("/dashboard"); // Redirect to the dashboard page after successful login
			} else {
				alert("Login failed");
			}
		} catch (error) {
			console.error("Login error:", error);
			alert("Login failed. Please check your credentials and try again.");
		}
	};

	return (
		<div className="login-page">
			<h1>Sign Up</h1>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
			</form>

			<style jsx>{`
				.login-page {
					max-width: 300px;
					margin: 0 auto;
				}
				input {
					display: block;
					margin-bottom: 10px;
					padding: 8px;
					width: 100%;
				}
			`}</style>
		</div>
	);
}
