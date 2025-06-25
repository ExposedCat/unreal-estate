import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "@tanstack/react-router";
import { Session_Get_Response_Schema } from "pronajemik-common";
import { useCallback } from "react";

export function useSession() {
	const navigate = useNavigate();

	const { data: sessionResponse } = useRequest("GET", "/session", {
		responseSchema: Session_Get_Response_Schema,
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
