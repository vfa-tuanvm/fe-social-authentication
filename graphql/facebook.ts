import { gql } from "@apollo/client";

export const FACEBOOK_LOGIN = gql`
	mutation loginFacebook($code: String!, $redirectURL: String!) {
		loginFacebook(input: { code: $code, redirectURL: $redirectURL }) {
			fullName
			email
			avatar
			accessToken
			refreshToken
		}
	}
`;
