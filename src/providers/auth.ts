import { AuthProvider } from "@refinedev/core";

import { API_URL, dataProvider } from "./data";

/**
 * Authentication provider object.
 * Contains methods for login, logout, error handling, and user information retrieval.
 */
export const authProvider: AuthProvider = {
	// Login the user by calling the login mutation
	login: async ({ email }) => {
		try {
			// Calls the GraphQL API to login the user
			// DataProvider.custom is used to make a custom request to the GraphQL API
			const { data } = await dataProvider.custom({
				url: `${API_URL}`,
				method: "post",
				headers: {},
				meta: {
					variables: { email },
					rawQuery: `
					mutation Login($email: String!) {
						login(loginInput: { email: $email }) {
							accessToken
						}
					}
					`,
				},
			});

			// If the login is successful, store the accessToken in localStorage
			localStorage.setItem("access_token", data.login.accessToken);

			return {
				success: true,
				redirectTo: "/",
			};
		} catch (e) {
			const error = e as Error;

			// If the login fails, return an error object
			return {
				success: false,
				error: {
					message: "message" in error ? error.message : "Login failed",
					name: "name" in error ? error.name : "Invalid email or password",
				},
			};
		}
	},

	// Logout the user by removing the accessToken from localStorage
	logout: async () => {
		localStorage.removeItem("access_token");
		return {
			success: true,
			redirectTo: "/login",
		};
	},

	// Handle errors such as UNAUTHENTICATED
	onError: async (error) => {
		// if the error is UNAUTHENTICATED, logout the user
		if (error.statusCode === "UNAUTHENTICATED") {
			return {
				logout: true,
				...error,
			};
		}

		return { error };
	},

	// Check if the user is authenticated
	check: async () => {
		const accessToken = localStorage.getItem("access_token");
		try {
			// Calls the GraphQL API to get the user information
			// We're using the me query to check if the user is authenticated
			await dataProvider.custom({
				url: API_URL,
				method: "post",
				headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
				meta: {
					rawQuery: `
                    query Me {
                        me {
                          name
                        }
                      }
                `,
				},
			});

			// If the user is authenticated, redirect to the home page
			return {
				authenticated: true,
				redirectTo: "/",
			};
		} catch (error) {
			// If the user is not authenticated, redirect to the login page
			return {
				authenticated: false,
				redirectTo: "/login",
			};
		}
	},

	// Retrieve's the user's information
	getIdentity: async () => {
		const accessToken = localStorage.getItem("access_token");
		try {
			const { data } = await dataProvider.custom<{ me: any }>({
				url: API_URL,
				method: "post",
				headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
				meta: {
					rawQuery: `
					query Me {
						me {
							id
							name
							email
							phone
							jobTitle
							timezone
							avatarUrl
						}
					}
					`,
				},
			});

			return data.me;
		} catch (error) {
			return undefined;
		}
	},
};
