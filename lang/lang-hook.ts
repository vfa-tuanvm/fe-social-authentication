import { useRouter } from "next/router";
import en from "./en";
import vi from "./vi";

const useTrans = () => {
	const { locale } = useRouter();

	const trans = locale === "vi" ? vi : en;

	return trans;
};

export default useTrans;
