import { ReactNode } from "react";
import { PaymentMethod, Role, Status } from "../utils/enums";

// Interfaces
interface Base {
  id: number;
  deleted: boolean;
}

export interface IProductVariant extends Base {
  product: IProduct;
  color: IColor;
  size: ISize;
  stock: number;
  details: IDetail[];
}

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

export interface IPurchaseOrder extends Base {
  date: Date;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: Status;
  user: IUser;
  details: IDetail[];
}

export interface IDetail extends Base {
  variant: IProductVariant;
  quantity: number;
}

export interface IDirection extends Base {
  street: string;
  number: number;
  locality: string;
  city: string;
  country: string;
  postalCode: number;
  users: IUser[];
}

export interface IUser extends Base {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
  directions: IDirection[];
  purchaseOrders: IPurchaseOrder[];
}

export interface ICategory extends Base {
  name: string;
  products: IProduct[];
  types: IType[];
}

export interface IType extends Base {
  name: string;
  category: ICategory;
}

export interface ISize extends Base {
  size: number;
  productVariants: IProductVariant[];
}

export interface IColor extends Base {
  name: string;
  productVariants: IProductVariant[];
}

export interface IDiscount extends Base {
    initialDate: Date;
    finalDate: Date;
    percentage: number;
    products: IProduct[];
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
  username: string;
  role: Role;
}
