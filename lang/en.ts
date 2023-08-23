import ILanguage from "../types/lang";

const en: ILanguage = {
	component: {
		button: {
			connect: "Connect",
			disconnect: "Disconnect",
			signOut: "Sign out",
			signIn: "Sign in",
			signUp: "Sign up",
			agree: "Agree",
			disagree: "Disagree",
		},
		input: {
			name: "Full name",
			email: "Email",
			password: "Password",
			rePassword: "Re-password",
		},
	},
	signIn: {
		title: "Sign In",
		subTitle: "Have a nice day",
		orDivider: "Or",
		notHaveAccount: "Don't have an account?",
		signUpHere: "Sign up here",
		authen: "Authenticating",
	},
	signUp: {
		title: "Sign Up",
		subTitle: "Welcome to our website",
		haveAccount: "If you have an account",
		signInHere: "Sign in here",
	},
	home: {
		disconTitle: "Do you want to disconnect to",
		disconContentStart: "You still be able to connect to",
		disconContentEnd: "in the future.",
	},
	error: {
		emailNotFound: "Your emai hasn't been registed yet",
		sthWrong: "Something went wrong",
		wrongPass: "Wrong password",
		usedEmail: "Please use other email",
		unauthorized: "Please login again",
		connected: "Your account has connected to",
		connectedToOtherUser(type) {
			return `This ${type.toLowerCase()} account has connected to other user`;
		},
		tryAgain: "Please try again",
	},
	success: {
		disconnect: "Disconnect success",
		connect: "Connect success",
	},
	validation: {
		requiredEmail: "Enter your email",
		requiredPass: "Enter your password",
		weakPass: "Your password is too weak",
		requiredFullName: "Enter your full name",
		requiredRePass: "Enter your password",
		notMatchPass: "Password not match",
	},
};

export default en;
