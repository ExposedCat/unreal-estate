import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export function useSession() {
	const navigate = useNavigate();

	const { data: sessionData } = useRequest("GET", "/session", {
		enabled: !!localStorage.getItem("token"),
	});

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		navigate({ to: "/login" });
	}, [navigate]);

	return {
		data: sessionData ?? null,
		logout,
	};
}
