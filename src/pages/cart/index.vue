<script lang="ts" setup>
import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'

definePage({
  style: {
    navigationBarTitleText: 'Shopping Cart',
  },
})

const cartStore = useCartStore()
const isCartEmpty = computed(() => cartStore.items.length === 0)
</script>

<template>
  <view class="page-container">
    <view v-if="isCartEmpty" class="empty-cart-container">
      <text class="empty-cart-text">Your cart is empty.</text>
      <navigator class="go-shopping-btn" open-type="switchTab" url="/pages/index/index">
        Go Shopping
      </navigator>
    </view>

    <view v-else class="cart-container">
      <view class="cart-items-list">
        <view v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <image :src="item.imageUrl" class="item-img" mode="aspectFill" />
          <view class="item-details">
            <text class="item-name">{{ item.name }}</text>
            <text class="item-price">¥{{ item.price.toFixed(2) }}</text>
          </view>
          <view class="item-controls">
            <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)">-</button>
            <text class="item-quantity">{{ item.quantity }}</text>
            <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
          </view>
        </view>
      </view>

      <view class="cart-summary">
        <view class="summary-row">
          <text>Total Items:</text>
          <text>{{ cartStore.totalItems }}</text>
        </view>
        <view class="summary-row total-price">
          <text>Total Price:</text>
          <text>￥{{ cartStore.totalPrice.toFixed(2) }}</text>
        </view>
        <button class="checkout-btn">Proceed to Checkout</button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page-container {
  padding: 15px;
}

.empty-cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

.empty-cart-text {
  font-size: 18px;
  color: #888;
  margin-bottom: 20px;
}

.go-shopping-btn {
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border-radius: 8px;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.item-img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 10px;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
}

.item-price {
  font-size: 14px;
  color: #888;
}

.item-controls {
  display: flex;
  align-items: center;
}

.item-controls button {
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  padding: 0;
}

.item-quantity {
  margin: 0 10px;
  font-size: 16px;
}

.cart-summary {
  margin-top: 20px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.total-price {
  font-weight: bold;
  font-size: 18px;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #4cd964;
  color: white;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
