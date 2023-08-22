import client from "../apollo-client";
import { GET_ACCOUNTS_QUERY } from "../graphql/home-page";
import { IGetSocialAccountsResponse } from "../types/graphql.respose";
import { handleException } from "./handleException";

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
		handleException(error);
	}
};
