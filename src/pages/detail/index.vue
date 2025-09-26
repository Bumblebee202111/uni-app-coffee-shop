<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { Product } from '@/types/product'
import { fetchProductById } from '@/api/mock'

const product = ref<Product | null>(null)
const isLoading = ref(true)

onLoad(async (options) => {
  if (options?.id) {
    const productId = parseInt(options.id, 10)

    try {
      const fetchedProduct = await fetchProductById(productId)
      if (fetchedProduct) {
        product.value = fetchedProduct
      }
    } catch (error) {
      console.error('Failed to fetch product: ', error)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})
</script>

<template>
  <view class="page-container">
    <view v-if="isLoading" class="loading-container">
      <text>Loading details...</text>
    </view>
    <view v-else-if="product" class="detail-container">
      <image :src="product.imageUrl" class="detail-image" mode="aspectFill" />
      <text class="detail-name">{{ product.name }}</text>
      <text class="detail-price">￥{{ product.price.toFixed(2) }}</text>
      <text class="detail-description">{{ product.description }}</text>
      <button class="add-to-cart-btn">Add to Cart</button>
    </view>
    <view v-else class="error-container">
      <text>Product not found.</text>
    </view>
  </view>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.loading-container,
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  color: #888;
}

.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-image {
  width: 100%;
  height: 250px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.detail-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.detail-price {
  font-size: 22px;
  color: #fa5252;
  font-weight: bold;
  margin-bottom: 20px;
}

.detail-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 30px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background-color: #007aff;
  color: white;
  border-radius: 8px;
  font-size: 16px;
}
</style>
