
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // Rands for simplicity
  imageUrl: string;
  category: string;
  stock: number;
};

export const products: Product[] = [
  {
    id: 'p-001',
    name: 'Wireless Headphones',
    description: 'Comfortable over-ear with ANC',
    price: 1499.0,
    imageUrl: 'https://picsum.photos/id/180/600/400',
    category: 'Audio',
    stock: 16,
  },
  {
    id: 'p-002',
    name: 'Mechanical Keyboard',
    description: 'Hot-swappable, RGB',
    price: 1299.0,
    imageUrl: 'https://picsum.photos/id/1080/600/400',
    category: 'Peripherals',
    stock: 24,
  },
];
