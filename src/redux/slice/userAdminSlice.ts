import { AdminUserData } from "@/types/admin"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AdminUserData = {
    data: [],
    meta: {
        total: 0,
        totalPage: 1,
        limit: 10,
        page: 1
    }
}

const userAdminSlice = createSlice({
    name: "userAdmin",
    initialState,
    reducers: {
        setAdminUserData(state: AdminUserData, action: PayloadAction<AdminUserData>) {
            return action.payload;
        }
    }
});
export const { setAdminUserData } = userAdminSlice.actions;

export const userAdminReducer = userAdminSlice.reducer;