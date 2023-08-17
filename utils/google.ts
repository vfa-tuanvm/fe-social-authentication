export function genURLGoogleLogin(state: string) {
	const rootUrl = process.env.GOOGLE_URL;

	const options = {
		redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT as string,
		client_id: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [process.env.GOOGLE_EMAIL_SCOPE, process.env.GOOGLE_PROFILE_SCOPE].join(" "),
		state,
	};

	const qs = new URLSearchParams(options);

	return `${rootUrl}?${qs.toString()}`;
}
