export interface ProfileInfoResponse {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}

export interface ProductRequest {
  title: string;
  price: number;
  category: string;
  inStock: number;
  description: string;
  owner: string;
}

// Specific Product All Details
export interface ProductResponse {
  productId: number;
  title: string;
  price: number;
  category: string;
  inStock: number;
  description: string;
  image: any;
  createdDate: string;
}

// Product All Info
export interface ProductAllInfo {
  productId: number;
  title: string;
  price: number;
  category: string;
  inStock: number;
  description: string;
  image: any;
  owner: string;
  createdDate: string;
  isOwner: boolean;
}

// Product Specific Details For Grabbing All Produts
export interface ProductSpecificDetails {
  productId: number;
  title: string;
  description: string;
  price: number;
  inStock: number;
  image: any;
}

export interface Cart {
  productId: number;
  title: string;
  price: number;
  category: string;
  inStock: number;
  description: string;
  image: any;
  quantity: number;
  totalPrice: number;
}

// Checkout
export interface CheckoutRequest {
  customer: string;
  products: Array<CheckoutProductInfo>;
}

export interface CheckoutProductInfo {
  productId: number;
  quantity: number;
}

// Edit Product
export interface ProductEdit {
  productId: number;
  title: string;
  price: number;
  category: string;
  inStock: number;
  description: string;
}
