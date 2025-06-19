import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => (
		<VStack gap={6} align="center" py={12}>
			<Heading size="2xl" textAlign="center">
				Find Your Perfect Property
			</Heading>
			<Text fontSize="lg" color="gray.600" textAlign="center" maxW="2xl">
				Discover the best real estate deals with our advanced filtering system.
				Whether you're buying or renting, we help you find exactly what you're
				looking for.
			</Text>
			<VStack gap={4}>
				<Button colorScheme="primary" size="lg">
					Search Properties
				</Button>
				<Text fontSize="sm" color="gray.500">
					Over 10,000+ properties available
				</Text>
			</VStack>
		</VStack>
	),
});
