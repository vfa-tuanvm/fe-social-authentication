import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
	mutation signUp($email: String!, $password: String!, $fullName: String!) {
		signup(input: { email: $email, password: $password, fullName: $fullName }) {
			email
			fullName
			avatar
			accessToken
			refreshToken
		}
	}
`;
