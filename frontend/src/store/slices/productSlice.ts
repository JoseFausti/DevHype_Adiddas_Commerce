import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct} from "../../types/types";

const savedProducts = localStorage.getItem("products");

const initialState: {products: IProduct[], productActive: IProduct | null}= {
    products: savedProducts ? JSON.parse(savedProducts) : [],
    productActive: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
            localStorage.setItem("products", JSON.stringify(action.payload));
        },
        setProductActive: (state, action: PayloadAction<IProduct | null>) => {state.productActive = action.payload},
        clearProducts: (state) => {
            state.products = [];
            localStorage.removeItem("products");
        },
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        editProduct: (state, action: PayloadAction<IProduct>) => {
            state.products = state.products.map((product) => product.id === action.payload.id ? action.payload : product);
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        removeProduct: (state, action: PayloadAction<IProduct>) => {
            state.products = state.products.filter((product) => product.id !== action.payload.id);
            localStorage.setItem("products", JSON.stringify(state.products));
        }
    }
})

export const { setProducts, setProductActive, addProduct, editProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;