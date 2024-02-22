// di dalam file paymentSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dataCheckout: {},
  dataCheckoutMax: {},
  discountedTotalFee: 0,
  isLoading: true,
  isLoadingPayment: false,
  originalTotalFee: 0,
  paymentSuccess: {},
  paymentData: [],
  pointData: {},
  selectedChannel: '',
  usePoint: false,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setDataCheckout: (state, action) => {
      state.dataCheckout = action.payload
    },
    setDataCheckoutMax: (state, action) => {
      state.dataCheckoutMax = action.payload
    },
    setDiscountedTotalFee: (state, action) => {
      state.discountedTotalFee = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsLoadingPayment: (state, action) => {
      state.isLoadingPayment = action.payload
    },
    setOriginalTotalFee: (state, action) => {
      state.originalTotalFee = action.payload
    },
    setPaymentSuccess: (state, action) => {
      state.paymentSuccess = action.payload
    },
    setPaymentData: (state, action) => {
      state.paymentData = action.payload
    },
    setPointData: (state, action) => {
      state.pointData = action.payload
    },
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload
    },
    setUsePoint: (state, action) => {
      state.usePoint = action.payload
    },
  },
})

export const {
  setDataCheckout,
  setDataCheckoutMax,
  setDiscountedTotalFee,
  setIsLoading,
  setIsLoadingPayment,
  setOriginalTotalFee,
  setPaymentSuccess,
  setPaymentData,
  setPointData,
  setSelectedChannel,
  setUsePoint,
} = paymentSlice.actions

export default paymentSlice.reducer
