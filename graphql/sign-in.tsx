import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
	mutation signIn($email: String!, $password: String!) {
		signin(input: { email: $email, password: $password }) {
			fullName
			email
			avatar
			accessToken
			refreshToken
		}
	}
`;
