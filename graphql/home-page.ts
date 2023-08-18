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
