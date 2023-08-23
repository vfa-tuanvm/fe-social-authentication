import { SocialType } from "../constance/enum";
import ILanguage from "../types/lang";

const vi: ILanguage = {
	component: {
		button: {
			connect: "Liên kết",
			disconnect: "Hủy liên kết",
			signOut: "Đăng xuất",
			signIn: "Đăng nhập",
			signUp: "Đăng ký",
			agree: "Đồng ý",
			disagree: "Hủy",
		},
		input: {
			name: "Họ và Tên",
			email: "Email",
			password: "Mật khẩu",
			rePassword: "Nhập lại mật khẩu",
		},
	},
	signIn: {
		title: "Đăng nhập",
		subTitle: "Chúc bạn một ngày tốt lành",
		orDivider: "Hoặc",
		notHaveAccount: "Bạn chưa có tài khoản",
		signUpHere: "Đăng ký tại đây",
		authen: "Đang xác thực tài khoản",
	},
	signUp: {
		title: "Đăng ký",
		subTitle: "Chào mừng bạn đến với chúng tôi",
		haveAccount: "Nếu bạn đã có tài khoản",
		signInHere: "Đăng nhập tại đây",
	},
	home: {
		disconTitle: "Bạn có muốn hủy kết nối tới tài khoản",
		disconContentStart: "Bạn vẫn có thể kết nối tới",
		disconContentEnd: "trong tương lai.",
	},
	error: {
		emailNotFound: "Email của bạn chưa được đăng ký",
		sthWrong: "Đã có lỗi xảy ra. Vui lòng thử lại sau",
		wrongPass: "Mật khẩu không đúng",
		usedEmail: "Vui lòng sử dụng một email khác",
		unauthorized: "Vui lòng đăng nhập lại",
		connected: "Tài khoản của bạn đã được kiên kêt với",
		connectedToOtherUser: (type: SocialType) =>
			`Tài khoản ${type.toLowerCase()} này đã liên kết với 1 người dùng khác`,
		tryAgain: "Vui lòng thử lại sau",
	},
	success: {
		disconnect: "Hủy liên kết thành công",
		connect: "Liên kết thành công",
	},
	validation: {
		requiredEmail: "Vui lòng nhập email",
		requiredPass: "Vui lòng nhập mật khẩu",
		weakPass: "Mật khẩu yếu",
		requiredFullName: "Vui lòng nhập họ và tên",
		requiredRePass: "Vui lòng nhập lại mật khẩu",
		notMatchPass: "Mật khẩu không khớp",
	},
};

export default vi;
