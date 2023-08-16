import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});
