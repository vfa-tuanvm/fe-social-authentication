import { gql } from "@apollo/client";

export const GET_ACCOUNTS_QUERY = gql`
	query getAccountsLinked {
		getAccountsLinked {
			socialId
			type
		}
	}
`;

export const DISCONNECT_MUTATION = gql`
	mutation disconnect($type: String!) {
		disconnect(type: $type)
	}
`;

export const GET_USER_INFO_QUERY = gql`
	query getUserInfo {
		getUserInfo {
			fullName
			avatar
			email
		}
	}
`;

export const CONNECT_SOCIAL_MUTATION = gql`
	mutation linkSocialAccount($code: String!, $type: String!, $redirectURL: String) {
		linkSocialAccount(input: { code: $code, type: $type, redirectURL: $redirectURL })
	}
`;
