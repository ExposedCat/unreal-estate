import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { TEST } from "unreal-estate-common";

export const App = () => {
	return (
		<VStack>
			<Heading>React Essential</Heading>
			<Text>{TEST}</Text>
			<Button background="sample">Click me</Button>
		</VStack>
	);
};
