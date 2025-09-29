import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'Coffee Shop',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
  },
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#007AFF',
    borderStyle: 'black',
    backgroundColor: '#FFFFFF',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'Home',
        iconPath: 'static/tabs/home-inactive.png',
        selectedIconPath: 'static/tabs/home-active.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: 'Cart',
        iconPath: 'static/tabs/cart-inactive.png',
        selectedIconPath: 'static/tabs/cart-active.png',
      },
    ],
  },
  subPackages: [],
})
