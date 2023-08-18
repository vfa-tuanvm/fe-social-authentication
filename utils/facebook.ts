export function genURLFacebookLogin() {
	const appId = process.env.FB_APP_ID;
	const redirectURL = process.env.FB_REDIRECT || "";
	const state = "{fbloged=1}";

	const uri = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
		redirectURL
	)}&state=${state}&scope=email`;

	return uri;
}
