import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse } from "../../types/graphql.respose";
import { RootState } from "../store";

export interface UserSlice {
	fullName?: string;
	email?: string;
	avatar?: string;
}

const initialState: UserSlice = {
	fullName: "",
	email: "",
	avatar: "",
};

export const userSilce = createSlice({
	name: "user",
	initialState,
	reducers: {
		storeUser: (state, user: PayloadAction<IAuthResponse>) => {
			const { avatar, fullName, email, accessToken, refreshToken } = user.payload;
			state.avatar = avatar;
			state.fullName = fullName;
			state.email = email;

			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);
		},
	},
});

// Action creators are generated for each case reducer function
export const { storeUser } = userSilce.actions;
export const selectUser = (state: RootState) => state.user;
export default userSilce.reducer;
