import { gql } from "@apollo/client";

export const GET_ACCOUNTS_QUERY = gql`
	query getAccountsLinked {
		getAccountsLinked {
			socialId
			type
		}
	}
`;
