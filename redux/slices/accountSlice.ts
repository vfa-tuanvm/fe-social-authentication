import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISocialAcount } from "../../types/graphql.respose";
import { RootState } from "../store";
import { SocialType } from "../../constance/enum";

const initialState: ISocialAcount[] = [];

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		add: (state, account: PayloadAction<ISocialAcount[]>) => {
			state.push(...account.payload);
		},
		remove: (state, type: PayloadAction<SocialType>) => {
			const index = state.findIndex((acc) => acc.type === type.payload);
			state.splice(index, 1);
		},
	},
});

// Action creators are generated for each case reducer function
export const { add, remove } = accountSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default accountSlice.reducer;
