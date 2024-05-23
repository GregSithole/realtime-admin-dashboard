import graphqlDataProvider, { GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = "wss://api.crm.refine.dev/graphql";

/**
 * The GraphQL client used for making API requests.
 * @type {GraphQLClient}
 */
export const client = new GraphQLClient(API_URL, {
	fetch: (url: string, options: RequestInit) => {
		try {
			return fetchWrapper(url, options);
		} catch (error) {
			return Promise.reject(error as Error);
		}
	}
});

/**
 * WebSocket client for real-time data communication.
 * 
 * @remarks
 * This client is created using the `createClient` function from the `graphql-ws` library.
 * It establishes a WebSocket connection to the specified URL and includes the access token
 * in the connection parameters for authentication.
 * 
 * @public
 */
export const wsClient = typeof window !== "undefined" ? createClient({
	url: WS_URL,
	connectionParams: () => {
		const accessToken = localStorage.getItem("accessToken");
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			}
		}
	}
}) : undefined;

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined;