import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export function useSession() {
	const navigate = useNavigate();

	const { isSuccess, data: sessionData } = useRequest("GET", "/session");

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		navigate({ to: "/login" });
	}, [navigate]);

	return {
		isAuthorized: isSuccess,
		data: sessionData ?? null,
		logout,
	};
}
