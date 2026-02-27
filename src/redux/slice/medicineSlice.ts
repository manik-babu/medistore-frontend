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

const medicineSlice = createSlice({
    name: "ShopMedicine",
    initialState,
    reducers: {
        setShopData(state: ShopMedicine, action: PayloadAction<ShopMedicine>) {
            return action.payload
        }
    }
});

export const { setShopData } = medicineSlice.actions;
export default medicineSlice.reducer;