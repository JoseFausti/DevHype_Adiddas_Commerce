import { ReactNode } from "react";
import { PaymentMethod, Role, Status } from "../utils/enums";

// Interfaces
interface Base {
  id: number;
}

// Product Variants
export interface IProductVariant extends Base {
  productId: number;
  color: IColor;
  size: ISize;
  stock: number;
}

export interface ICreateUpdateProductVariant extends Base {
  productId: number;
  colorId: number;
  sizeId: number;
  stock: number;
}

// Products
export interface IProduct extends Base {
  name: string;
  image: string | undefined;
  description: string;
  brand: string;
  price: number;
  category: ICategory;
  discounts: IDiscount[];
  productVariants: IProductVariant[];
}

export interface ICreateUpdateProduct extends Base{
  name: string;
  image: string;
  description: string;
  brand: string;
  price: number;
  categoryId: number;
  discountIds: number[];
  productVariants: ICreateUpdateProductVariant[];
}

// Purchase Orders
export interface IPurchaseOrder extends Base {
  date: Date;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: Status;
  user: IUser;
  details: IDetail[];
}

export interface ICreateUpdatePurchaseOrder extends Base {
  paymentMethod: PaymentMethod;
  status: Status;
  userId: number;
  details: ICreateUpdateDetail[];
}

// Details
export interface IDetail extends Base {
  quantity: number;
  variant: IProductVariant;
}

export interface ICreateUpdateDetail extends Base {
  quantity: number;
  variantId: number;
  purchaseOrderId: number;
}

export interface IDirection extends Base {
  street: string;
  number: number;
  locality: string;
  city: string;
  country: string;
  postalCode: number;
}

// Users
export interface IUser extends Base {
  username: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
  directions: IDirection[];
}

export interface ICreateUpdateUser extends Base {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
  directionsIds: number[];
}

export interface ICategory extends Base {
  name: string;
}

// Types
export interface IType extends Base {
  name: string;
  category: ICategory;
}

export interface ICreateUpdateType extends Base {
  name: string;
  categoryName: string;
}

export interface ISize extends Base {
  size: number;
}

export interface IColor extends Base {
  name: string;
}

export interface IDiscount extends Base {
    initialDate: Date;
    finalDate: Date;
    percentage: number;
}

export interface IRegisterUser {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  directions: Omit<IDirection, 'id' | 'deleted'>[];
}

// Props
export interface ChildrenProps {
  children: ReactNode;
}

// Http props
export interface IHttpResponse<E> {
  data: E;
  error: string;
  status: number;
}

// Token
export interface ITokenPayload {
  sub: string;
  role: Role;
}
