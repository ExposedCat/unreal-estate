import { Page, Row } from "@/components/layout";
import { Alert, Button, Input, Label } from "@/components/ui";
import { Form, useForm } from "@/components/ui/Form";
import { useRedirectAuthorized } from "@/hooks";
import { request } from "@/services/requests";
import {
	Link,
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { Login_Post_Body_Schema } from "pronajemik-common";
import { useState } from "react";

type LoginSearch = {
	redirect?: string;
};

function LoginPage() {
	const { register, makeSubmit } = useForm(Login_Post_Body_Schema);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const search = useSearch({ from: "/login" });

	useRedirectAuthorized({ redirect: search.redirect });

	const onSubmit = makeSubmit(async (data) => {
		setIsLoading(true);
		setError("");

		try {
			const response = await request("POST", "/login", { body: data });

			if (response.ok) {
				localStorage.setItem("token", response.data);
				navigate({ to: search.redirect || "/dashboard" });
			} else {
				setError(response.error || "Login failed");
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : "Login failed");
		}

		setIsLoading(false);
	});

	return (
		<Page>
			<Label text="Welcome Back" size="header" />

			{error && <Alert color="error" label={error} />}

			<Form onSubmit={onSubmit}>
				<Input
					required
					width="large"
					type="email"
					placeholder="Email"
					{...register("email")}
				/>
				<Input
					required
					width="large"
					type="password"
					placeholder="Password"
					autoComplete="current-password"
					{...register("password")}
				/>

				<Row css={{ marginTop: "$sm" }} />

				<Button
					type="submit"
					width="large"
					disabled={isLoading}
					label={isLoading ? "Signing In..." : "Sign In"}
				/>
			</Form>

			<Label text="Don't have an account? ">
				<Link
					to="/register"
					search={search.redirect ? { redirect: search.redirect } : {}}
				>
					<Label text="Sign up here" />
				</Link>
			</Label>
		</Page>
	);
}

export const Route = createFileRoute("/login")({
	component: LoginPage,
	validateSearch: (search: Record<string, unknown>): LoginSearch => ({
		redirect: search.redirect as string,
	}),
});
