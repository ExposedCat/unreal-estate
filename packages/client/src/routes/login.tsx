import { Page, Row } from "@/components/layout";
import { Button, Card, Input, Label } from "@/components/ui";
import { Form, useForm } from "@/components/ui/Form";
import { post } from "@/services/requests";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginRequestSchema } from "pronajemik-common";
import { useState } from "react";

function LoginPage() {
	const { register, makeSubmit } = useForm(LoginRequestSchema);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const onSubmit = makeSubmit(async (data) => {
		setIsLoading(true);
		setError("");

		const response = await post("/login", data);

		if (response.ok) {
			localStorage.setItem("token", response.data);
			navigate({ to: "/" });
		} else {
			setError(response.error || "Login failed");
		}

		setIsLoading(false);
	});

	return (
		<Page>
			<Label text="Welcome Back" size="large" />
			<Label text="Sign in to your account" align="center" />

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
					autoComplete="current-password"
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
					label={isLoading ? "Signing In..." : "Sign In"}
				/>
			</Form>

			<Label text="Don't have an account? ">
				<Link to="/register">
					<Label text="Sign up here" />
				</Link>
			</Label>
		</Page>
	);
}

export const Route = createFileRoute("/login")({
	component: LoginPage,
});
