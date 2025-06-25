import { createStitches, globalCss } from "@stitches/react";

export const applyGlobalStyles = globalCss({
	"*": {
		boxSizing: "border-box",
		margin: 0,
		padding: 0,
		fontFamily: "Raleway, sans-serif",
	},
	"html,body,#root": {
		width: "100%",
		height: "100%",
		fontSize: "16px",
	},
});

export const { styled, css, createTheme } = createStitches({
	theme: {
		colors: {
			white: "#ffffff",
			black: "#1d1c1c",
			transparent: "transparent",
			"text-primary": "#1d1c1c",
			"text-inverse": "#ffffff",
			"text-muted": "#6b7280",
			"bg-canvas": "#B6D9FF",
			"bg-surface": "#ffffff",
			"bg-muted": "#f3f4f6",
			"border-default": "#1d1c1c",
			"status-success": "#16a34a",
			"status-warning": "#ea9e0c",
			"status-error": "#dc2626",
			"status-info": "#0891b2",
			"interactive-primary": "#2563eb",
			"interactive-primary-hover": "#1d4ed8",
		},
		space: {
			xs: "0.25rem",
			sm: "0.5rem",
			md: "1rem",
			lg: "1.5rem",
			xl: "2rem",
		},
		sizes: {
			full: "100%",
			xs: "10rem",
			sm: "20rem",
			md: "30rem",
			lg: "45rem",
			maxView: "72rem",
		},
		radii: {
			none: "0",
			basic: "0.5rem",
			full: "50rem",
		},
		borderWidths: {
			none: "0",
			thin: "0.1rem",
			thick: "0.25rem",
		},
		fontSizes: {
			small: "0.9rem",
			normal: "1rem",
			header: "3rem",
		},
		fontWeights: {
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700",
		},
	},
});
