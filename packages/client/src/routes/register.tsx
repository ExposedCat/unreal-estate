import { Page, Row } from "@/components/layout";
import { Button, Card, Input, Label } from "@/components/ui";
import { Form, useForm } from "@/components/ui/Form";
import { request } from "@/services/requests";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { RegisterRequestSchema } from "pronajemik-common";
import { useState } from "react";

function RegisterPage() {
	const { register, makeSubmit } = useForm(RegisterRequestSchema);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const onSubmit = makeSubmit(async (data) => {
		setIsLoading(true);
		setError("");

		try {
			const response = await request("POST", "/register", { body: data });

			if (response.ok) {
				localStorage.setItem("token", response.data);
				navigate({ to: "/" });
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
				<Link to="/login">
					<Label text="Sign in here" />
				</Link>
			</Label>
		</Page>
	);
}

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});
