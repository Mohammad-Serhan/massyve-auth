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
		<>
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl text-black font-bold mb-8 text-center">
						Sign Up
					</h2>
					<form onSubmit={handleLogin}>
						<div className="mb-6">
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								placeholder="Enter your email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								placeholder="Enter your password"
								autoComplete="new-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<div className="mb-6">
							<button
								type="submit"
								className="w-full px-3 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
