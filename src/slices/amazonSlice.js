import React, { useEffect, useState } from 'react'
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  favorites: [],
  userInfo:[],
  status: 'idle'
};


// export const sendProductsToCart = createAsyncThunk(
//   'amazon/sendProductsToCart',
//   async (cartItems, { getState }) => {
//     const apitoken = localStorage.getItem('api_token');
//     const { userInfo } = getState().amazon;

//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/updatecart',
//         { user_id: userInfo.id, cartItems },
//         {
//           headers: {
//             Authorization: `Bearer ${apitoken}`,
//             Accept: 'application/json',
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );


// 1
// export const sendProductsToCart = createAsyncThunk(
//   'amazon/sendProductsToCart',
//   async ({ products }, { getState }) => {
//     try {
//       const apiToken = localStorage.getItem('api_token'); // Ensure you have the user's API token
//       if (!apiToken) {
//         throw new Error('User not authenticated');
//       }

//       const response = await axios.post('http://127.0.0.1:8000/api/updatecart', {
//         products,
//         userId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${apiToken}`,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );




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


  // extraReducers: (builder) => {
  //   builder
  //     .addCase(updateCartOnServer.fulfilled, (state, action) => {
  //       // This case will be triggered after a successful server update
  //       // You can update the Redux state here, e.g., adding the item
  //       state.products.push(action.payload);
  //     })
  //     .addCase(updateCartOnServer.rejected, (state, action) => {
  //       // Handle error if the server update fails
  //       // You can show an error message or take appropriate action
  //       alert('Error updating cart on the server');
  //     });
  // },   



});

export const { addToCart, addToFavourite, removeFromFavorite, removeFromCart, clearCart,clearFavourite, quantityIncrement, quantityDecrement } = amazonSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.amazon.products;
export const selectFavourties = (state) => state.amazon.favorites;
export const selectTotal = (state) => state.amazon.products.reduce((total, item) => total + (item.price * item.quantity) , 0)

// export const updateCartOnSignIn = createAsyncThunk('amazon/updateCartOnSignIn', async (cartItems, { getState }) => {

//   // const [apitoken, setapitoken] = useState('');
//   // useEffect(() => {
//   //     const storedapitoken = localStorage.getItem('api_token');
//   //     if (storedapitoken) {
//   //         setapitoken(storedapitoken);
//   //     }
//   // }, []);

//   let apitoken = localStorage.getItem('api_token')


//   const { userInfo } = getState().amazon;
//   try {
//     const response = await axios.post('http://127.0.0.1:8000/api/user/updatecart',{user_id: userInfo.id, cartItems}, {
//         headers: {
//           Authorization: `Bearer ${apitoken}`, 
//         },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
// );

export default amazonSlice.reducer;




































































// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   products: [],
//   userInfo: [],
//   status: 'idle'
// };

// // Create an async thunk action to update the cart on the backend
// // export const updateCartOnBackend = () => async (dispatch, getState) => {
// //   const { products } = getState().amazon; // Get the cart state
// //   try {
// //     // Send a POST request to your Laravel API to update the cart
// //     const response = await axios.post('http://127.0.0.1:8000/api/user/updatecart', { products });
// //     // Handle the response if needed
// //     console.log(response.data)
// //   } catch (error) {
// //     // Handle errors
// //     console.error(error);
// //   }
// // };


// export const updateCartOnBackend = createAsyncThunk('amazon/updatecart', async(amazon) => {
//   const response = await axios.post('http://127.0.0.1:8000/api/user/updatecart',amazon)
//   return response.data;
// })



// export const amazonSlice = createSlice({
//   name: "amazon",
//   initialState,
//   reducers: {
//     // Existing reducers
//     addToCart: (state, action) => {
//       const item = state.products.find((item) => item.id === action.payload.id)
//       if (item) {
//         item.quantity += action.payload.quantity
//       } else {
//         state.products.push(action.payload)
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.products = state.products.filter((item) => item.id !== action.payload)
//     },
//     clearCart: (state) => {
//       state.products = []
//       window.scrollTo({ top: 0 });
//     },
//     quantityIncrement: (state, action) => {
//       const item = state.products.find((item) => item.id === action.payload)
//       item.quantity++
//     },
//     quantityDecrement: (state, action) => {
//       const item = state.products.find((item) => item.id === action.payload)
//       if (item.quantity === 1) {
//         item.quantity = 1
//       } else {
//         item.quantity--
//       }
//     },
    
//     // Add a new action to trigger the API update
//     // updateCartInBackend: (state) => {
//       // Dispatch the updateCartOnBackend action to send cart data to the server
//       // You can dispatch this action when needed, e.g., when the user checks out
//       // dispatch(updateCartOnBackend());
//     // },
//   },
// });

// export const { addToCart, removeFromCart, clearCart, quantityIncrement, quantityDecrement, updateCartInBackend } = amazonSlice.actions;

// // Selectors - This is how we pull information from the Global store slice
// export const selectItems = (state) => state.amazon.products;
// export const selectTotal = (state) => state.amazon.products.reduce((total, item) => total + (item.price * item.quantity), 0);

// export default amazonSlice.reducer;
 