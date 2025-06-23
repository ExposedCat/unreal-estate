import { Page } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

function RegisterPage() {
	// const [login, setLogin] = useState("");
	// const [password, setPassword] = useState("");
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState("");
	// const navigate = useNavigate();

	// const handleSubmit = async (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	setIsLoading(true);
	// 	setError("");

	// 	const response = await post("/login", { email: login, password });

	// 	if (response.ok) {
	// 		localStorage.setItem("token", response.data);
	// 		navigate({ to: "/" });
	// 	} else {
	// 		setError(response.error || "Login failed");
	// 	}

	// 	setIsLoading(false);
	// };

	return (
		<Page>
			{/* <PageHeader
				title="Welcome Back"
				subtitle="Sign in to your account"
				size="lg"
				textAlign="center"
			/>

			{error && (
				<Alert status="error" width="full">
					{error}
				</Alert>
			)}

			<Card width="full">
				<Box as="form" onSubmit={handleSubmit} width="full">
					<VStack gap="form.section">
						<Field
							label="Username or Email"
							required
							type="text"
							value={login}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setLogin(event.target.value)
							}
							placeholder="Enter your username or email"
						/>

						<Field
							label="Password"
							required
							type="password"
							value={password}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
							placeholder="Enter your password"
						/>

						<Button
							type="submit"
							width="full"
							isLoading={isLoading}
							label="Sign In"
							loadingLabel="Signing In..."
						/>
					</VStack>
				</Box>
			</Card>

			<Text fontSize="sm" color="text.muted" textAlign="center">
				Don't have an account?
				<ChakraLink asChild color="interactive.primary">
					<Link to="/register">Sign up here</Link>
				</ChakraLink>
			</Text> */}
		</Page>
	);
}

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});
