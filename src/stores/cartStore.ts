import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem, Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  // --- STATE ---
  const items = ref<CartItem[]>([])

  // --- GETTERS ---

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // --- ACTIONS ---

  function addItem(product: Product) {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }

    void uni.showToast({ title: 'Added to cart', icon: 'success' })
  }

  function removeItem(productId: number) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function updateQuantity(productId: number, newQuantity: number) {
    const item = items.value.find((item) => item.id === productId)
    if (item) {
      if (newQuantity > 0) {
        item.quantity = newQuantity
      } else {
        removeItem(productId)
      }
    }
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
  }
})
