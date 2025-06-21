import { withRelatedProject } from "@vercel/related-projects";

export const API_HOST = withRelatedProject({
	projectName: "pronajemik-server",
	defaultHost: "https://api.pronajemik.com",
});

export async function apiFetch(path: string, init?: RequestInit) {
	const url = `${API_HOST}${path}`;
	const response = await fetch(url, init);
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}
	return response;
}
