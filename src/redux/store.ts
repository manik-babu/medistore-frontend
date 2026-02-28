import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slice/cartSlice"
import userReducer from './slice/userSlice'
import shopReducer from './slice/medicineSlice'
import { categoryReducer } from "./slice/categories";
import { userAdminReducer } from "./slice/userAdminSlice";
import { adminMedicineReducer } from "./slice/adminMedicine";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        shop: shopReducer,
        category: categoryReducer,
        adminUser: userAdminReducer,
        adminMedicine: adminMedicineReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

