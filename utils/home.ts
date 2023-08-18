import toast from "react-hot-toast";
import client from "../apollo-client";
import { GET_ACCOUNTS_QUERY } from "../graphql/home-page";
import { IGetSocialAccountsResponse, IGraphQLError } from "../types/graphql.respose";

export const getAccounts = async () => {
	const token = localStorage.getItem("accessToken");

	try {
		const { data } = await client.query<IGetSocialAccountsResponse>({
			query: GET_ACCOUNTS_QUERY,
			context: {
				headers: {
					authorization: token ? `Bearer ${token}` : "",
				},
			},
		});

		return data.getAccountsLinked;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const { graphQLErrors } = error;

		if (graphQLErrors) {
			const { statusCode } = graphQLErrors[0] as IGraphQLError;
			console.log("statusCode: ", statusCode);

			switch (statusCode) {
				case 400:
					toast.error("You are unauthrorized");
					break;

				default:
					toast.error("Something went wrong");
					break;
			}
		} else {
			toast.error("Something went wrong");
		}
	}
};
