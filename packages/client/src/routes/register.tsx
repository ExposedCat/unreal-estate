import { Page, Row } from "@/components/layout";
import { Button, Card, Input, Label } from "@/components/ui";
import { Form, useForm } from "@/components/ui/Form";
import { useRedirectAuthorized } from "@/hooks";
import { request } from "@/services/requests";
import {
	Link,
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { Register_Post_Body_Schema } from "pronajemik-common";
import { useState } from "react";

type RegisterSearch = {
	redirect?: string;
};

function RegisterPage() {
	const { register, makeSubmit } = useForm(Register_Post_Body_Schema);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const search = useSearch({ from: "/register" });

	useRedirectAuthorized({ redirect: search.redirect });

	const onSubmit = makeSubmit(async (data) => {
		setIsLoading(true);
		setError("");

		try {
			const response = await request("POST", "/register", { body: data });

			if (response.ok) {
				localStorage.setItem("token", response.data);
				navigate({ to: search.redirect || "/dashboard" });
			} else {
				setError(response.error || "Registration failed");
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : "Registration failed");
		}

		setIsLoading(false);
	});

	return (
		<Page>
			<Label text="Sign Up" size="large" />
			<Label text="No ads. No emails. No bullshit." align="center" />

			{error && <Card color="error">{error}</Card>}

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
					autoComplete="new-password"
					{...register("password")}
				/>

				<Row css={{ marginTop: "$sm" }}>
					<Label
						text="By proceeding, you agree to our Terms of Service and Privacy Policy."
						size="small"
						align="center"
					/>
				</Row>

				<Button
					type="submit"
					width="large"
					disabled={isLoading}
					label={isLoading ? "Signing Up..." : "Sign Up"}
				/>
			</Form>

			<Label text="Already have an account? ">
				<Link
					to="/login"
					search={search.redirect ? { redirect: search.redirect } : {}}
				>
					<Label text="Sign in here" />
				</Link>
			</Label>
		</Page>
	);
}

export const Route = createFileRoute("/register")({
	component: RegisterPage,
	validateSearch: (search: Record<string, unknown>): RegisterSearch => ({
		redirect: search.redirect as string,
	}),
});
