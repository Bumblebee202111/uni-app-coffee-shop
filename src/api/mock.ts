import type { Product } from '@/types/product'

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Classic Americano',
    price: 25.0,
    description: 'Rich and aromatic, a true classic for coffee purists.',
    imageUrl: '/static/images/americano.png',
  },
  {
    id: 2,
    name: 'Creamy Latte',
    price: 30.0,
    description: 'A smooth and comforting blend of rich espresso and steamed milk.',
    imageUrl: '/static/images/latte.png',
  },
  {
    id: 3,
    name: 'Foamy Cappuccino',
    price: 30.0,
    description: 'The perfect balance of espresso, steamed milk, and airy foam.',
    imageUrl: '/static/images/cappuccino.png',
  },
  {
    id: 4,
    name: 'Iced Mocha',
    price: 32.0,
    description: 'A delightful treat of chilled espresso, chocolate, and milk.',
    imageUrl: '/static/images/mocha.png',
  },
]

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts)
    }, 500)
  })
}

export function fetchProductById(id: number): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === id)
      resolve(product)
    }, 300)
  })
}
