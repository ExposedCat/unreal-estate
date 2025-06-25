import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "@tanstack/react-router";
import { Session_Get_Response_Schema } from "pronajemik-common";
import { useEffect, useRef } from "react";

type UseRedirectAuthorizedOptions = {
	redirect?: string;
};

export function useRedirectAuthorized(
	options: UseRedirectAuthorizedOptions = {},
) {
	const { redirect } = options;
	const navigate = useNavigate();
	const hasInitialToken = useRef(!!localStorage.getItem("token"));

	const { data: sessionData, error } = useRequest("GET", "/session", {
		responseSchema: Session_Get_Response_Schema,
		enabled: hasInitialToken.current,
	});

	useEffect(() => {
		if (!hasInitialToken.current) return;

		if (sessionData?.ok) {
			if (redirect) {
				navigate({ to: redirect });
			} else {
				navigate({ to: "/dashboard" });
			}
		} else if ((sessionData && !sessionData.ok) || error) {
			localStorage.removeItem("token");
		}
	}, [sessionData, error, redirect, navigate]);
}
