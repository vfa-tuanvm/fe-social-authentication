/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		BE_URL: process.env.BE_URL,
		FB_APP_ID: process.env.FB_APP_ID,
		FB_REDIRECT: process.env.FB_REDIRECT,
	},
	images: {
		domains: ["platform-lookaside.fbsbx.com"],
	},
};

module.exports = nextConfig;
