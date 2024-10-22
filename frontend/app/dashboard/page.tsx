"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

// Define an interface for the user data
interface UserData {
	user: {
		name: string;
		lastName: string;
	};
}

// Define an interface for the error response from Axios
interface AxiosError {
	response?: {
		data?: {
			message?: string;
		};
	};
}

export default function Dashboard() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login"); // Redirect to login if no token
		} else {
			axios
				.get<UserData>(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
					headers: {
						Authorization: token,
					},
				})
				.then((response: AxiosResponse<UserData>) => {
					setUserData(response.data); // Set the user data from response
				})
				.catch((error: AxiosError) => {
					// Improved type definition for error handling
					console.error(
						error.response?.data?.message || "An error occurred"
					);
					router.push("/login");
				});
		}
	}, [router]);

	if (!userData) return <p>Loading...</p>;

	return (
		<div className="p-5">
			{userData?.user ? (
				<h1>
					Welcome, {userData.user.name},  {userData.user.lastName}
				</h1>
			) : (
				<h1>No user info available</h1>
			)}
		</div>
	);
}
