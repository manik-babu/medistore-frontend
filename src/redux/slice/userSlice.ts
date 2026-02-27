import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
    id: string;
    name: string;
    role: "ADMIN" | "SELLER" | "CUSTOMER";
    image?: string;
} | null

const initialState: any = null;

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            return action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;