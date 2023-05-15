import { StarTypesPayload } from "../stars-rate/star-types.payload";

export interface ProductRequestHomePayload {
  productId: string;
  image: string;
  title: string;
  rate: number;
  price: number;
  inStock: number;
  starTypes: StarTypesPayload;
}
