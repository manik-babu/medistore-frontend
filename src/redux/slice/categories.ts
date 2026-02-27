import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
    id: string;
    name: string;
}

const initialState: State[] = [
    {
        id: "all",
        name: "All Categories"
    }
]
const categorySlice = createSlice({
    name: "medicine-category",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<State[]>) {
            return [...state, ...action.payload]
        }
    }
});

export const { setCategories } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer