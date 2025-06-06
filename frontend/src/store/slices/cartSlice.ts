import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetail, IProductVariant } from "../../types/types";

interface CartState {
  cart: IDetail[];
  productActive: IProductVariant | null;
}

const initialState: CartState = {
  cart: [],
  productActive: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<IDetail[]>) => {
      state.cart = action.payload;
    },
    setProductActive: (state, action: PayloadAction<IProductVariant | null>) => {
      state.productActive = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addProduct: (state, action: PayloadAction<IDetail>) => {
      // Busca si ya existe un item con el mismo variant.id
      const existing = state.cart.find(item => item.variant.id === action.payload.variant.id);
      if (existing) {
        existing.quantity += action.payload.quantity; // Existing actualiza el estado ya que es una referencia directa al objeto dentro del array state.cart (gracias a Immer bajo el capo)
      } else {
        state.cart.push(action.payload);
      }
    },
    editProductQuantity: (state, action: PayloadAction<IDetail>) => {
      const item = state.cart.find(item => item.variant.id === action.payload.variant.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeProduct: (state, action: PayloadAction<IDetail>) => {
      state.cart = state.cart.filter(item => item.variant.id !== action.payload.variant.id);
    },
  },
});

export const {
  setCart,
  clearCart,
  addProduct,
  editProductQuantity,
  removeProduct,
  setProductActive,
} = cartSlice.actions;

export default cartSlice.reducer;
