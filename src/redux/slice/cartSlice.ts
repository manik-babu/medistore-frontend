import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: number;
}

const initialState: InitialState = {
    value: 0
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        setCartValue(state, action: PayloadAction<number>) {
            state.value = action.payload;
        },
        increment(state) {
            state.value = state.value + 1;
        },
        decrement(state) {
            state.value = state.value - 1;
        }
    }
});

export const { setCartValue, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;