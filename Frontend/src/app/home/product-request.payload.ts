export interface ProductRequestPayload {
  productId: string;
  image: string;
  title: string;
  rate: number;
  price: number;
  inStock: number;
  star: Array<number>;
  star_half: Array<number>;
  star_border: Array<number>;
}
