import { ShopMedicine } from "@/types/medicine";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ShopMedicine = {
    data: [],
    meta: {
        total: 0,
        page: 1,
        limit: 5,
        totalPage: 1
    }
}

const adminMedicineSlice = createSlice({
    name: "AdminPanelMedicine",
    initialState,
    reducers: {
        setAdminMedicineData(state: ShopMedicine, action: PayloadAction<ShopMedicine>) {
            return action.payload
        }
    }
});

export const { setAdminMedicineData } = adminMedicineSlice.actions;
export const adminMedicineReducer = adminMedicineSlice.reducer;