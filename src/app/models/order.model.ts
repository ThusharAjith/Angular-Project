export interface Order {
  timestamp: string;
  totalPrice: number;
  userId: string;
  items: { name: string; price: number; productId: string }[];
}
