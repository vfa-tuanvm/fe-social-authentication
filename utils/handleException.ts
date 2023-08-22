import toast from "react-hot-toast";
import {
	CAN_NOT_GET_FACEBOOK_TOKEN,
	CAN_NOT_GET_GOOGLE_TOKEN,
	CAN_NOT_GET_USER_FACEBOOK,
	CAN_NOT_GET_USER_GOOGLE,
	EMAIL_HAS_BEEN_USED,
	PASSWORD_NOT_MATCH,
	USER_NOT_FOUND,
	YOU_ARE_UNAUTHORIZE,
} from "../constance/error-code";
import { IGraphQLError } from "../types/graphql.respose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleException = (error: any) => {
	const { graphQLErrors } = error;

	if (graphQLErrors) {
		const { statusCode, code } = graphQLErrors[0] as IGraphQLError;

		switch (statusCode) {
			case 400:
				if (code === YOU_ARE_UNAUTHORIZE) {
					toast.error("You are unauthrorized");
				} else {
					toast.error("Something went wrong");
				}
				break;
			case 404:
				if (code === USER_NOT_FOUND) {
					toast.error("Your email hasn't been registed yet.");
				} else {
					toast.error("Something went wrong");
				}
				break;
			case 406:
				if (code === PASSWORD_NOT_MATCH) {
					toast.error("Wrong password");
				} else {
					toast.error("Something went wrong");
				}
				break;
			case 409:
				if (code === EMAIL_HAS_BEEN_USED) {
					toast.error("Please use other email");
				} else {
					toast.error("Something went wrong");
				}
				break;
			case 500:
				if (code === CAN_NOT_GET_FACEBOOK_TOKEN || code === CAN_NOT_GET_USER_FACEBOOK) {
					toast.error("Please try to log in using Facebook again");
				} else if (code === CAN_NOT_GET_GOOGLE_TOKEN || code === CAN_NOT_GET_USER_GOOGLE) {
					toast.error("Please try to log in using Google again");
				} else {
					toast.error("Something went wrong");
				}
				break;
			default:
				toast.error("Something went wrong");
				break;
		}
	} else {
		toast.error("Something went wrong");
	}
};
