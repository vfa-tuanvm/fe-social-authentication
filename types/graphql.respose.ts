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

export interface IGraphQLError {
	code: string;
	message: string;
	statusCode: number;
}
