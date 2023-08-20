import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
		storeUser: (state, user: PayloadAction<UserSlice>) => {
			const { avatar, fullName, email } = user.payload;
			state.avatar = avatar;
			state.fullName = fullName;
			state.email = email;
		},
	},
});

// Action creators are generated for each case reducer function
export const { storeUser } = userSilce.actions;
export const selectUser = (state: RootState) => state.user;
export default userSilce.reducer;
