"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserData {
	user: {
		name: string;
		lastName: string;
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
				.get("http://localhost:5000/auth/me", {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => {
					setUserData(response.data);
				})
				.catch((error) => {
					console.error(error);
					router.push("/login");
				});
		}
	}, [router]);

	if (!userData) return <p>Loading...</p>;

	return (
		<div className="p-5">
			{userData?.user ? (
				<h1>
					Welcome, {userData.user.name}, {userData.user.lastName}
				</h1>
			) : (
				<h1>No user info available</h1>
			)}
		</div>
	);
}
