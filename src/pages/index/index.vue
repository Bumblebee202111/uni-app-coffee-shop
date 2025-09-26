<template>
  <view class="page-container">
    <view v-if="isLoading" class="loading-container">
      <text>Loading products...</text>
    </view>

    <view v-else class="product-grid">
      <navigator
        v-for="product in products"
        :key="product.id"
        :url="`/pages/detail/index?id=${product.id}`"
        class="product-card-link"
      >
        <view class="product-card">
          <image :src="product.imageUrl" class="product-image" mode="aspectFill" />
          <text class="product-name">{{ product.name }}</text>
          <text class="product-price">¥{{ product.price.toFixed(2) }}</text>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Product } from '@/types/product'
import { fetchProducts } from '@/api/mock'
import { onLoad } from '@dcloudio/uni-app'

const products = ref<Product[]>()
const isLoading = ref<boolean>(true)

onLoad(async () => {
  try {
    products.value = await fetchProducts()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    await uni.showToast({ title: 'Failed to load products', icon: 'none' })
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.page-container {
  padding: 15px;
  background-color: #f7f7f7;
  min-height: 100vh;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  color: #888;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.product-card-link {
  text-decoration: none;
}

.product-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.product-image {
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 16px;
  color: #fa5252;
  font-weight: bold;
}
</style>
