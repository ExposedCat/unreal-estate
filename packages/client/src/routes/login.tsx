import { Field } from "@/components/ui/field";
import { post } from "@/services/requests";
import {
	Box,
	Button,
	Card,
	Link as ChakraLink,
	Heading,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

function LoginPage() {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		setError("");

		const response = await post("/login", { email: login, password });

		if (response.ok) {
			localStorage.setItem("token", response.data);
			navigate({ to: "/" });
		} else {
			setError(response.error || "Login failed");
		}

		setIsLoading(false);
	};

	return (
		<Box maxW="md" mx="auto" mt={12}>
			<Card.Root p={8}>
				<VStack gap={6}>
					<Heading size="lg" textAlign="center">
						Welcome Back
					</Heading>
					<Text color="gray.600" textAlign="center">
						Sign in to your account
					</Text>

					{error && (
						<Box
							p={3}
							bg="error.50"
							borderColor="error.200"
							borderWidth="1px"
							borderRadius="md"
							w="full"
						>
							<Text color="error.600">{error}</Text>
						</Box>
					)}

					<Box as="form" onSubmit={handleSubmit} w="full">
						<VStack gap={4}>
							<Field label="Username or Email" required>
								<Input
									type="text"
									value={login}
									onChange={(event) => setLogin(event.target.value)}
									placeholder="Enter your username or email"
								/>
							</Field>

							<Field label="Password" required>
								<Input
									type="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter your password"
								/>
							</Field>

							<Button
								type="submit"
								colorScheme="primary"
								size="lg"
								w="full"
								disabled={isLoading}
							>
								{isLoading ? "Signing In..." : "Sign In"}
							</Button>
						</VStack>
					</Box>

					<Text fontSize="sm" color="gray.500" textAlign="center">
						Don't have an account?{" "}
						<ChakraLink asChild color="primary.500">
							<Link to="/register">Sign up here</Link>
						</ChakraLink>
					</Text>
				</VStack>
			</Card.Root>
		</Box>
	);
}

export const Route = createFileRoute("/login")({
	component: LoginPage,
});
