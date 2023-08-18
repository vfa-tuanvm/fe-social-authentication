export interface IAuthResponse {
	fullName: string;
	email: string;
	avatar: string;
	accessToken: string;
	refreshToken: string;
}

export interface ISignInResponse {
	signin: IAuthResponse;
}

export interface ISignUpResponse {
	signup: IAuthResponse;
}

export interface IFacebookLogin {
	loginFacebook: IAuthResponse;
}

export interface IGoogleLogin {
	loginGoogle: IAuthResponse;
}

export interface IGraphQLError {
	code: string;
	message: string;
	statusCode: number;
}

export interface ISocialAcount {
	socialId: string;
	type: string;
}

export interface IGetSocialAccountsResponse {
	getAccountsLinked: ISocialAcount[];
}

export interface IDisconnectResponse {
	disconnect: string;
}
