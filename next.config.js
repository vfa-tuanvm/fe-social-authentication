/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		BE_URL: process.env.BE_URL,
		FB_APP_ID: process.env.FB_APP_ID,
		FB_REDIRECT: process.env.FB_REDIRECT,
		GOOGLE_URL: process.env.GOOGLE_URL,
		GOOGLE_EMAIL_SCOPE: process.env.GOOGLE_EMAIL_SCOPE,
		GOOGLE_PROFILE_SCOPE: process.env.GOOGLE_PROFILE_SCOPE,
		GOOGLE_OAUTH_REDIRECT: process.env.GOOGLE_OAUTH_REDIRECT,
		GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
		DEFAULT_AVATAR: process.env.DEFAULT_AVATAR,
	},
	images: {
		domains: ["platform-lookaside.fbsbx.com", "img.myloview.com"],
	},
};

module.exports = nextConfig;
