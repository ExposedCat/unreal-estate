import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "@tanstack/react-router";
import { SessionResponseSchema } from "pronajemik-common";
import { useCallback } from "react";

export function useSession() {
	const navigate = useNavigate();

	const { data: sessionResponse } = useRequest("GET", "/session", {
		responseSchema: SessionResponseSchema,
		enabled: !!localStorage.getItem("token"),
	});

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		navigate({ to: "/login" });
	}, [navigate]);

	return {
		data: sessionResponse?.ok ? sessionResponse : null,
		logout,
	};
}
