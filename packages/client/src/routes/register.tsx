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

function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters long");
			setIsLoading(false);
			return;
		}

		const response = await post("/register", { email, password });

		if (response.ok) {
			localStorage.setItem("token", response.data);
			navigate({ to: "/" });
		} else {
			setError(response.error || "Registration failed");
		}

		setIsLoading(false);
	};

	return (
		<Box maxW="md" mx="auto" mt={12}>
			<Card.Root p={8}>
				<VStack gap={6}>
					<Heading size="lg" textAlign="center">
						Create Account
					</Heading>
					<Text color="gray.600" textAlign="center">
						Join us to find your perfect property
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
							<Field label="Email" required>
								<Input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email address"
								/>
							</Field>

							<Field label="Password" required>
								<Input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Create a password"
									minLength={6}
								/>
							</Field>

							<Field label="Confirm Password" required>
								<Input
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Confirm your password"
								/>
							</Field>

							<Button
								type="submit"
								colorScheme="primary"
								size="lg"
								w="full"
								disabled={isLoading}
							>
								{isLoading ? "Creating Account..." : "Create Account"}
							</Button>
						</VStack>
					</Box>

					<Text fontSize="sm" color="gray.500" textAlign="center">
						Already have an account?{" "}
						<ChakraLink asChild color="primary.500">
							<Link to="/login">Sign in here</Link>
						</ChakraLink>
					</Text>
				</VStack>
			</Card.Root>
		</Box>
	);
}

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});
