// store.js
import { configureStore } from '@reduxjs/toolkit'
import checkoutReducer from './checkoutSlice'
import paymentReducer from './paymentSlice'

export default configureStore({
  reducer: {
    checkout: checkoutReducer,
    payment: paymentReducer,
  },
})
