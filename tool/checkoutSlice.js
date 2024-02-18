// checkoutSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  destinationTarget: {},
  loading: false,
  numberOfPerson: 1,
  checkoutData: {},
  userData: {},
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setDestinationTarget: (state, action) => {
      state.destinationTarget = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setNumberOfPerson: (state, action) => {
      state.numberOfPerson = action.payload
    },
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})

export const {
  setDestinationTarget,
  setLoading,
  setNumberOfPerson,
  setCheckoutData,
  setUserData,
} = checkoutSlice.actions

export default checkoutSlice.reducer
