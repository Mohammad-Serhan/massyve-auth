"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

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
				.get<AxiosResponse<UserData>>(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((response: AxiosResponse<UserData>) => {
					setUserData(response.data); // Assuming you have a function setUserData
				})
				.catch((error: any) => {
					// You can refine the type of error if you know the structure
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
