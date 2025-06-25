import { useSession } from "@/hooks/useSession";
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

	const { isAuthorized } = useSession();

	useEffect(() => {
		if (!hasInitialToken.current) return;

		if (isAuthorized) {
			if (redirect) {
				navigate({ to: redirect });
			} else {
				navigate({ to: "/dashboard" });
			}
		}
	}, [isAuthorized, redirect, navigate]);
}
