import { styled } from "@/theme";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import type { Static, TObject, TProperties } from "@sinclair/typebox";
import type { ComponentProps } from "@stitches/react";
import { useForm as _useForm } from "react-hook-form";

export const StyledForm = styled("form", {
	width: "$full",
	height: "$full",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "$sm",
});

type FormProps = Omit<ComponentProps<typeof StyledForm>, "onSubmit"> & {
	onSubmit: (event?: React.BaseSyntheticEvent) => void;
};

export const Form: React.FC<FormProps> = ({ ...props }) => {
	return <StyledForm {...props} />;
};

export const useForm = <T extends TObject<TProperties>>(schema: T) => {
	const form = _useForm({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: typeboxResolver(schema),
	});

	const makeSubmit = (callback: (data: Static<T>) => void) => {
		return form.handleSubmit((data) => callback(data as Static<T>));
	};

	return {
		register: form.register,
		makeSubmit,
	};
};
