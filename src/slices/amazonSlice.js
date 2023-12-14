import React, { useEffect, useState } from 'react'
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  favorites: [],
  userInfo:[],
  status: 'idle'
};



export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    // Actions
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id)
      if(item) {
        item.quantity += action.payload.quantity
      } else { 
        state.products.push(action.payload)
      }
    },

    addToFavourite: (state, action) => {
      const item = state.favorites.find((item) => item.id === action.payload.id);
      if (!item) {
        // Include a quantity of 1 when adding to favorites
        state.favorites.push({ ...action.payload, quantity: 1 });
      }
    },
    
    removeFromCart: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload)
    },

    removeFromFavorite: (state, action) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.products = []
      window.scrollTo({ top: 0 });
    },

    clearFavourite: (state) => {
      state.favorites = []
      window.scrollTo({ top: 0 });
    },

    quantityIncrement: (state,action) => {
      const item = state.products.find((item) => item.id === action.payload)
      item.quantity++
    },

    quantityDecrement: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload)
      if(item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity --
      }
    }
  },



});

export const { addToCart, addToFavourite, removeFromFavorite, removeFromCart, clearCart,clearFavourite, quantityIncrement, quantityDecrement } = amazonSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.amazon.products;
export const selectFavourties = (state) => state.amazon.favorites;
export const selectTotal = (state) => state.amazon.products.reduce((total, item) => total + (item.price * item.quantity) , 0)

export default amazonSlice.reducer;


