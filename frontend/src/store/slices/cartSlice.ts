import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductVariant } from "../../types/types";

const initialState: {cart: IProductVariant[], productActive: IProductVariant | null}= {
    cart: [],
    productActive: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCart: (state, action: PayloadAction<IProductVariant[]>) => {state.cart = action.payload},
        setProductActive: (state, action: PayloadAction<IProductVariant | null>) => {state.productActive = action.payload},
        clearCart: (state) => {state.cart = []},
        addProduct: (state, action: PayloadAction<IProductVariant>) => {state.cart.push(action.payload);},
        editProduct: (state, action: PayloadAction<IProductVariant>) => {state.cart = state.cart.map((product) => product.id === action.payload.id ? action.payload : product);},
        removeProduct: (state, action: PayloadAction<IProductVariant>) => {state.cart.filter((product) => product.id !== action.payload.id);}
    }
})

export const { setCart, clearCart, addProduct, editProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;