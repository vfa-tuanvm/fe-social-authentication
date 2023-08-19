import toast from "react-hot-toast";
import client from "../apollo-client";
import { CONNECT_SOCIAL_MUTATION, DISCONNECT_MUTATION, GET_ACCOUNTS_QUERY } from "../graphql/home-page";
import {
	IConnectResponse,
	IDisconnectResponse,
	IGetSocialAccountsResponse,
	IGraphQLError,
} from "../types/graphql.respose";
import { SocialType } from "../constance/enum";

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

export const disconnect = async (type: SocialType) => {
	const token = localStorage.getItem("accessToken");

	try {
		const { data } = await client.mutate<IDisconnectResponse>({
			mutation: DISCONNECT_MUTATION,
			variables: {
				type: type,
			},
			context: {
				headers: {
					authorization: token ? `Bearer ${token}` : "",
				},
			},
		});
		if (data) {
			toast.success("Disconnect success.");
			return data.disconnect;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const { graphQLErrors } = error;

		if (graphQLErrors) {
			const { statusCode } = graphQLErrors[0] as IGraphQLError;

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

export const connect = async (type: SocialType, code: string, redirectURL?: string) => {
	try {
		const token = localStorage.getItem("accessToken");

		const { data } = await client.mutate<IConnectResponse>({
			mutation: CONNECT_SOCIAL_MUTATION,
			variables: {
				code,
				type,
				redirectURL,
			},
			context: {
				headers: {
					authorization: token ? `Bearer ${token}` : "",
				},
			},
		});

		if (data) {
			toast.success("Disconnect success.");
			return data.linkSocialAccount;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const { graphQLErrors } = error;

		if (graphQLErrors) {
			const { statusCode } = graphQLErrors[0] as IGraphQLError;

			switch (statusCode) {
				case 400:
					toast.error("You are unauthrorized");
					break;
				case 409:
					toast.error(`Your account has connected to ${type.toLowerCase()}`);
					break;
				case 500:
					toast.error("Please try agian later");
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
