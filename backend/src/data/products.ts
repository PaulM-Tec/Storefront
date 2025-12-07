
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
    name: 'Apple MacBook Air 13-inch',
    description: 'Thin, lightweight design, silent fanless operation, long battery life',
    price: 11499.0,
    imageUrl: 'https://picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA',
    category: 'Laptop',
    stock: 5,
  },
  {
    id: 'p-002',
    name: 'Apple MacBook Air 15-inch',
    description: 'The ultimate on-the-go laptop, giving you more space onscreen for multi­tasking',
    price: 18299.0,
    imageUrl: 'https://picsum.photos/id/6/5000/3333.jpg?hmac=pq9FRpg2xkAQ7J9JTrBtyFcp9-qvlu8ycAi7bUHlL7I',
    category: 'Laptops',
    stock: 7,
  },
];
