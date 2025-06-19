import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		tokens: {
			colors: {
				sample: { value: "red" },
				primary: {
					50: { value: "#eff6ff" },
					100: { value: "#dbeafe" },
					200: { value: "#bfdbfe" },
					300: { value: "#93c5fd" },
					400: { value: "#60a5fa" },
					500: { value: "#3b82f6" },
					600: { value: "#2563eb" },
					700: { value: "#1d4ed8" },
					800: { value: "#1e40af" },
					900: { value: "#1e3a8a" },
				},
				success: {
					50: { value: "#f0fdf4" },
					100: { value: "#dcfce7" },
					200: { value: "#bbf7d0" },
					300: { value: "#86efac" },
					400: { value: "#4ade80" },
					500: { value: "#22c55e" },
					600: { value: "#16a34a" },
					700: { value: "#15803d" },
					800: { value: "#166534" },
					900: { value: "#14532d" },
				},
				error: {
					50: { value: "#fef2f2" },
					100: { value: "#fee2e2" },
					200: { value: "#fecaca" },
					300: { value: "#fca5a5" },
					400: { value: "#f87171" },
					500: { value: "#ef4444" },
					600: { value: "#dc2626" },
					700: { value: "#b91c1c" },
					800: { value: "#991b1b" },
					900: { value: "#7f1d1d" },
				},
				gray: {
					50: { value: "#f9fafb" },
					100: { value: "#f3f4f6" },
					200: { value: "#e5e7eb" },
					300: { value: "#d1d5db" },
					400: { value: "#9ca3af" },
					500: { value: "#6b7280" },
					600: { value: "#4b5563" },
					700: { value: "#374151" },
					800: { value: "#1f2937" },
					900: { value: "#111827" },
				},
			},
			spacing: {
				xs: { value: "0.5rem" },
				sm: { value: "0.75rem" },
				md: { value: "1rem" },
				lg: { value: "1.5rem" },
				xl: { value: "2rem" },
				"2xl": { value: "3rem" },
				"3xl": { value: "4rem" },
			},
			radii: {
				sm: { value: "0.25rem" },
				md: { value: "0.375rem" },
				lg: { value: "0.5rem" },
				xl: { value: "0.75rem" },
			},
		},
		semanticTokens: {
			colors: {
				primary: {
					solid: { value: "{colors.primary.500}" },
					contrast: { value: "white" },
					fg: { value: "{colors.primary.700}" },
					muted: { value: "{colors.primary.100}" },
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, config);
