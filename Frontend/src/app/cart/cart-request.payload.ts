export interface CartRequestPayload {
  productId: number;
  image: string;
  title: string;
  description: string;
  price: number;
  inStock: number;
  quantity: number;
}
