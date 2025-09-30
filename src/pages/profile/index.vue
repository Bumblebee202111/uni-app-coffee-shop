<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { mockServerLogin } from '@/api/mock'

definePage({
  style: {
    navigationBarTitleText: 'My Profile',
  },
})

interface UserProfile {
  nickName: string
  avatarUrl: string
}

const userProfile = ref<UserProfile | null>(null)
const isLoading = ref(false)

async function handleGetUserInfo(event: any) {
  if (!event.detail.userInfo) {
    void uni.showToast({ title: 'Login cancelled', icon: 'none' })
    return
  }

  isLoading.value = true
  const userProfileData = event.detail.userInfo

  try {
    const loginResult = await uni.login()
    const serverResponse = await mockServerLogin({
      code: loginResult.code,
      profile: userProfileData,
    })

    uni.setStorageSync('sessionToken', serverResponse.token)

    const profile: UserProfile = {
      nickName: userProfileData.nickName,
      avatarUrl: userProfileData.avatarUrl,
    }

    userProfile.value = profile
    uni.setStorageSync('userProfile', profile)

    void uni.showToast({ title: 'Login successful', icon: 'success' })
  } catch (loginError) {
    console.error('uni.login() failed:', loginError)
    void uni.showToast({ title: 'Login failed, please try again.', icon: 'none' })
  } finally {
    isLoading.value = false
  }
}

function handleLogout() {
  userProfile.value = null
  uni.removeStorageSync('userProfile')
  uni.showToast({ title: 'Logged out', icon: 'none' })
}

onLoad(() => {
  const savedProfile = uni.getStorageSync('userProfile')
  if (savedProfile) {
    userProfile.value = savedProfile
  }
})
</script>

<template>
  <view class="page-container">
    <view v-if="!userProfile" class="logged-out-container">
      <text class="prompt-text">Login in to view your profile</text>

      <button
        :loading="isLoading"
        class="login-btn"
        open-type="getUserInfo"
        @getuserinfo="handleGetUserInfo"
      >
        Login with WeChat
      </button>
    </view>

    <view v-else class="logged-in-container">
      <image :src="userProfile.avatarUrl" class="avatar" mode="aspectFill" />
      <text class="nickname">{{ userProfile.nickName }}</text>

      <view class="menu-list">
        <view class="menu-item">
          <text>My Orders</text>
          <text>›</text>
        </view>
        <view class="menu-item">
          <text>My Addresses</text>
          <text>›</text>
        </view>
        <view class="menu-item">
          <text>Settings</text>
          <text>›</text>
        </view>
      </view>

      <button class="logout-btn" @click="handleLogout">Logout</button>
    </view>
  </view>
</template>

<style scoped>
.page-container {
  padding: 15px;
}

.logged-out-container,
.logged-in-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

.prompt-text {
  font-size: 18px;
  color: #888;
  margin-bottom: 20px;
}

.login-btn {
  width: 80%;
  background-color: #04be02;
  color: white;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.nickname {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
}

.menu-list {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #f7f7f7;
}

.menu-item:last-child {
  border-bottom: none;
}

.logout-btn {
  margin-top: 30px;
  width: 80%;
  background-color: #f3f3f3;
  color: #333;
}
</style>
