import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct} from "../../types/types";

const initialState: {products: IProduct[], productActive: IProduct | null}= {
    products: [],
    productActive: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {state.products = action.payload},
        setProductActive: (state, action: PayloadAction<IProduct | null>) => {state.productActive = action.payload},
        clearProducts: (state) => {state.products = []},
        addProduct: (state, action: PayloadAction<IProduct>) => {state.products.push(action.payload);},
        editProduct: (state, action: PayloadAction<IProduct>) => {state.products = state.products.map((product) => product.id === action.payload.id ? action.payload : product);},
        removeProduct: (state, action: PayloadAction<IProduct>) => {state.products.filter((product) => product.id !== action.payload.id);}
    }
})

export const { setProducts, setProductActive, addProduct, editProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;