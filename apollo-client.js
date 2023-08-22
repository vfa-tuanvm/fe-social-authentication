import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
	uri: process.env.BE_URL,
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "no-cache",
		},
	},
});

export default client;
