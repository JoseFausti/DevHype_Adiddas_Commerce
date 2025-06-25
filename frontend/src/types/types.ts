import { ReactNode } from "react";
import { PaymentMethod, Role, Status } from "../utils/enums";

// Interfaces
interface Base {
  id: number;
  deleted?: boolean;
}

// Product Variants
export interface IProductVariant extends Base {
  productId: number;
  color: IColor;
  size: ISize;
  stock: number;
}

export interface ICreateUpdateProductVariant {
  productName: string;
  colorName: string;
  sizeNumber: number;
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
  type: IType;
  discounts: IDiscount[];
  productVariants: IProductVariant[];
}

export interface ICreateUpdateProduct {
  name: string;
  image: string;
  description: string;
  brand: string;
  price: number;
  categoryName: string;
  typeName: string;
  discountPercentages: number[];
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

export interface ICreateUpdatePurchaseOrder {
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

export interface ICreateUpdateDetail {
  id?: number;
  quantity: number;
  variantId: number;
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
  password?: string;
  role: Role;
  directions: IDirection[];
}

export interface ICreateUpdateUser {
  username: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  role: Role;
  directionIds: number[];
}

export interface ICategory extends Base {
  name: string;
  types: IType[];
}

// Types
export interface IType extends Base {
  name: string;
}

export interface ICreateUpdateType {
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
