import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetail, IProductVariant } from "../../types/types";

// Intentar cargar el carrito desde localStorage al iniciar
const savedCart = localStorage.getItem("cart");

interface CartState {
  cart: IDetail[];
  productActive: IProductVariant | null;
}

const initialState: CartState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
  productActive: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<IDetail[]>) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setProductActive: (state, action: PayloadAction<IProductVariant | null>) => {
      state.productActive = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    addProduct: (state, action: PayloadAction<IDetail>) => {
      // Busca si ya existe un item con el mismo variant.id
      const existing = state.cart.find(item => item.variant.id === action.payload.variant.id);
      if (existing) {
        existing.quantity += action.payload.quantity; // Existing actualiza el estado ya que es una referencia directa al objeto dentro del array state.cart (gracias a Immer bajo el capo)
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    editProductQuantity: (state, action: PayloadAction<IDetail>) => {
      const item = state.cart.find(item => item.variant.id === action.payload.variant.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct: (state, action: PayloadAction<IDetail>) => {
      state.cart = state.cart.filter(item => item.variant.id !== action.payload.variant.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
