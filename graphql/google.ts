import { gql } from "@apollo/client";

export const GOOGLE_LOGIN = gql`
	mutation loginGoogle($input: String!) {
		loginGoogle(input: $input) {
			fullName
			email
			avatar
			accessToken
			refreshToken
		}
	}
`;
