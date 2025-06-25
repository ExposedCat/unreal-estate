import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "@tanstack/react-router";
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
		enabled: hasInitialToken.current,
	});

	useEffect(() => {
		if (!hasInitialToken.current) return;

		if (sessionData) {
			if (redirect) {
				navigate({ to: redirect });
			} else {
				navigate({ to: "/dashboard" });
			}
		} else if (error) {
			localStorage.removeItem("token");
		}
	}, [sessionData, error, redirect, navigate]);
}
