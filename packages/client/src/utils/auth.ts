import { request } from "@/services/requests";
import { redirect } from "@tanstack/react-router";

export async function requireAuth() {
	try {
		const response = await request("GET", "/session");

		if (!response.ok) {
			localStorage.removeItem("token");
			throw redirect({
				to: "/login",
				search: {
					redirect: location.pathname,
				},
			});
		}

		return response;
	} catch (error) {
		if (error && typeof error === "object" && "href" in error) {
			throw error;
		}

		localStorage.removeItem("token");
		throw redirect({
			to: "/login",
			search: {
				redirect: location.pathname,
			},
		});
	}
}
