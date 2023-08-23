import { SocialType } from "../constance/enum";

export default interface ILanguage {
	component: {
		button: {
			connect: string;
			disconnect: string;
			signOut: string;
			signIn: string;
			signUp: string;
			agree: string;
			disagree: string;
		};
		input: {
			name: string;
			email: string;
			password: string;
			rePassword: string;
		};
	};
	signIn: {
		title: string;
		subTitle: string;
		orDivider: string;
		notHaveAccount: string;
		signUpHere: string;
		authen: string;
	};
	signUp: {
		title: string;
		subTitle: string;
		haveAccount: string;
		signInHere: string;
	};
	home: {
		disconTitle: string;
		disconContentStart: string;
		disconContentEnd: string;
	};
	error: {
		emailNotFound: string;
		wrongPass: string;
		sthWrong: string;
		usedEmail: string;
		unauthorized: string;
		connected: string;
		connectedToOtherUser: (type: SocialType) => string;
		tryAgain: string;
	};
	success: {
		disconnect: string;
		connect: string;
	};
	validation: {
		requiredPass: string;
		requiredEmail: string;
		weakPass: string;
		requiredFullName: string;
		requiredRePass: string;
		notMatchPass: string;
	};
}
