import { GraphQLFormattedError } from "graphql";

type Error = {
	message: string;
	statusCode: string;
}

/**
 * Performs a custom fetch with additional headers, including the access token.
 * @param url - The URL to fetch.
 * @param options - The fetch options.
 * @returns A Promise that resolves to the fetch response.
 */
const customFetch = async (url: string, options: RequestInit) => {
	const accessToken = localStorage.getItem("accessToken");

	const headers = options.headers as Record<string, string>;

	return await fetch(url, {
		...options,
		headers: {
			...headers,
			Authorization: headers?.Authorization || `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			"Apollo-Require-Preflight": "true",
		}
	})
};

/**
 * Extracts GraphQL errors from the response body and returns an Error object.
 * If no errors are found, returns null.
 *
 * @param body - The response body containing GraphQL errors.
 * @returns An Error object if errors are found, otherwise null.
 */
const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
	if (!body) {
		return {
			message: "Unknown error",
			statusCode: "INTERNAL_SERVER_ERROR"
		};
	}

	if ("errors" in body) {
		const errors = body?.errors;
		const messages = errors?.map((error) => error?.message)?.join("");
		const code = errors?.[0]?.extensions?.code;
		return {
			message: messages || JSON.stringify(errors),
			statusCode: code || 500
		};
	}

	return null;
}

/**
 * Wrapper function for making HTTP requests using the Fetch API.
 *
 * @param url - The URL to send the request to.
 * @param options - The options to customize the request (e.g., headers, method, body).
 * @returns A Promise that resolves to the response from the server.
 * @throws If there is a GraphQL error in the response body.
 */
export const fetchWrapper = async (url: string, options: RequestInit) => {
	const response = await customFetch(url, options);
	const responseClone = response.clone();

	const body = await responseClone.json();

	const graphQLError = getGraphQLErrors(body);

	if (graphQLError) {
		throw graphQLError;
	}

	return response;
}