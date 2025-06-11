import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
    // Reducers are used to manage the state of the application
    reducer: {
        cart: cartReducer,
        user: userReducer,
        product: productReducer
    },
    // Middleware are used to intercept actions and modify them before they reach the reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch